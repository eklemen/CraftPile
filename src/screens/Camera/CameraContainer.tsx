import { GraphQLResult } from '@aws-amplify/api';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { Camera, CameraPictureOptions, CameraType } from 'expo-camera';
import { manipulateAsync } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';
import { Box, Center, IconButton, Spinner } from 'native-base';
import uuid from 'react-native-uuid';

import useCompData from '../../context/compData/useCompData';
import * as domains from '../../context/constants';
import { GetUserQuery } from '../../generated/API';
import { getUser } from '../../graphql/queries';
import { CameraScreenNavigationProp } from '../../types/routes';
import MockCamera from './MockCamera';
import { cameraStyles as styles } from './styles';
import { CameraCD, UserCD } from '../../context/constants';
import Shutter from '../../appIcons/Shutter';

function CameraContainer() {
  const [saveImageError, setSaveImageError] = useState<{ message: string }>();
  const [camera, setCamera] = useState<Camera>();
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [galleryPermission, setGalleryPermission] = useState<boolean>(false);
  const [uploadingImg, setUploadingImg] = useState<boolean>(false);
  const { compData: authCompData, setData: setAuthData } = useCompData<UserCD>(
    domains.AUTH
  );
  const { compData: cameraCompData, setData: setCameraCompData } =
    useCompData<CameraCD>(domains.CAMERA);
  const [loading, setLoading] = useState<boolean>(true);

  const askPermissions = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();

    setCameraPermission(cameraPermission.status === 'granted');

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();

    setGalleryPermission(imagePermission.status === 'granted');

    if (
      imagePermission.status !== 'granted' &&
      cameraPermission.status !== 'granted'
    ) {
      alert('Permission for Camera and Photo access needed.');
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      const userData = (await API.graphql(
        graphqlOperation(getUser)
      )) as GraphQLResult<GetUserQuery>;
      if (userData.data) {
        setAuthData({ user: userData.data.getUser });
      } else if (userData.errors) {
        setAuthData({ user: undefined });
      }
      setLoading(false);
    };
    getUserData();
    // TODO: make async useEffect correctly
    askPermissions();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!authCompData?.user?.children?.length) {
        navigation.navigate('ManageChildren', {});
      }
    }
  }, [loading]);

  if (!cameraPermission || !galleryPermission) {
    return <MockCamera />;
  }

  const handleImagePicked = async (
    pickerResult: ImagePicker.ImagePickerResult
  ) => {
    try {
      if (pickerResult.cancelled) {
        console.log('User canceled image picker');
        return;
      } else {
        await MediaLibrary.saveToLibraryAsync(pickerResult.uri);
        await saveImageToS3(pickerResult.uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const sendToQueue = (uri: string, isComplete: boolean = false) => {
    const queue = cameraCompData?.queue || {};
    const photoQueue = { ...queue, [uri]: { isComplete } };
    setCameraCompData({ queue: photoQueue });
  };

  const takePicture = async () => {
    if (camera) {
      setUploadingImg(true);
      const options: CameraPictureOptions = { quality: 0.5 };
      const data = await camera.takePictureAsync(options);
      sendToQueue(data.uri);
      await MediaLibrary.saveToLibraryAsync(data.uri);
      setUploadingImg(false);
      await saveImageToS3(data.uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    await handleImagePicked(result);
  };

  const saveThumbnail = async (imagePath: string, s3Path: string) => {
    const { uri: thumbnailUri } = await manipulateAsync(imagePath, [
      { resize: { width: 200 } },
    ]);
    const response = await fetch(thumbnailUri);
    const blob = await response.blob();
    const s3ThumbnailPath = `thumbnails/${s3Path}`;
    await Storage.put(s3ThumbnailPath, blob, {
      contentType: 'image/jpeg',
      level: 'public',
      metadata: {
        childId: cameraCompData?.selectedChild?.id,
        isThumbnail: 'true',
      },
      errorCallback: (err: any) => {
        console.error('Thumbnail error====', err);
      },
    } as any);
  };

  const saveImageToS3 = async (imagePath: string) => {
    try {
      setSaveImageError(undefined);
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const [extension] = imagePath.split('.').slice(-1);
      // should use the local file path instead of uuid
      const s3Path = `${
        authCompData.user?.accountId
      }/${uuid.v4()}.${extension}`;

      await Storage.put(s3Path, blob, {
        contentType: 'image/jpeg',
        level: 'public',
        metadata: {
          childId: cameraCompData?.selectedChild?.id,
        },
        errorCallback: (err: any) => {
          console.error('Unexpected error while uploading====', err);
        },
        progressCallback: ({
          loaded,
          total,
        }: {
          loaded: number;
          total: number;
        }) => {
          if (loaded === total) {
            sendToQueue(imagePath, true);
          }
        },
      } as any);
      await saveThumbnail(imagePath, s3Path);
    } catch (err) {
      console.log('err-------->', err);
      setSaveImageError({
        message: err.message,
      });
    }
  };

  return (
    <Center flex={1} justifyContent="center" w="100%">
      <Camera
        style={styles.camera}
        type={CameraType.back}
        ref={(ref: Camera) => setCamera(ref)}
      >
        <Box
          flex={1}
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Center h={115} w="100%">
            {uploadingImg ? (
              <Spinner w={65} h={65} size="lg" color="white" />
            ) : (
              <IconButton
                width={65}
                height={65}
                onPress={takePicture}
                variant="ghost"
                icon={<Shutter />}
              />
            )}
          </Center>
        </Box>
      </Camera>
    </Center>
  );
}

export default CameraContainer;
