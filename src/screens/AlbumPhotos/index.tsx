import { GraphQLResult } from '@aws-amplify/api';
import Storage from '@aws-amplify/storage';
import { API, graphqlOperation } from 'aws-amplify';
import { Formik } from 'formik';
import { Button, FormControl, Image, Input, Modal, Row } from 'native-base';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';

import { GetPhotosForAlbumQuery, Photo } from '../../generated/API';
import { getPhotosForAlbum } from '../../graphql/queries';
import { AlbumPhotosScreenRouteProp } from '../../types/routes';
import SelectedPhotoModal from './SelectedPhotoModal';

export type PhotoWithUri = Photo & { uri?: string; fullResUri?: string };

interface Props {
  route: AlbumPhotosScreenRouteProp;
}
function AlbumPhotos({ route }: Props) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoWithUri | null>(null);
  const [albumData, setAlbumData] =
    useState<GetPhotosForAlbumQuery['getPhotosForAlbum']>();
  const [photoUris, setPhotoUris] = useState<string[]>([]);
  useEffect(() => {
    const fetchAlbumData = async () => {
      const albumPhotos = (await API.graphql(
        graphqlOperation(getPhotosForAlbum, {
          input: {
            albumId: route.params?.albumId,
            childId: route.params?.childId,
          },
        })
      )) as GraphQLResult<GetPhotosForAlbumQuery>;
      setAlbumData(albumPhotos?.data?.getPhotosForAlbum);
    };
    fetchAlbumData();
  }, []);

  useEffect(() => {
    if (albumData?.photos?.length) {
      const photoUrlPromises: Promise<string>[] = albumData.photos.map(
        (photo) => {
          const s3Path = `thumbnails/${photo?.objectKey!.split('public/')[1]}`;
          return Storage.get(s3Path, {
            contentType: 'image/jpeg',
          });
        }
      );
      Promise.all(photoUrlPromises).then((photoUrls) => {
        setPhotoUris(photoUrls);
      });
    }
  }, [albumData]);

  useEffect(() => {
    if (photoUris.length) {
      const updatedPhotos = albumData?.photos?.map((photo, i: number) => ({
        ...photo,
        uri: photoUris[i],
      }));
      const updatedAlbumData = {
        ...albumData,
        photos: updatedPhotos,
      } as GetPhotosForAlbumQuery['getPhotosForAlbum'];
      setAlbumData(updatedAlbumData);
    }
  }, [photoUris.length]);

  const handleSelectPhoto = async (photo: Photo | null) => {
    if (photo) {
      const s3Path = photo.objectKey!.split('public/')[1];
      const fullResUri = await Storage.get(s3Path, {
        contentType: 'image/jpeg',
      });
      // const albumsPhotoBelongsTo = get albums to map to Ids
      setSelectedPhoto({
        ...photo,
        fullResUri,
      });
    }
  };

  console.log('selectedPhoto-------->', selectedPhoto);
  return (
    <View>
      <Row>
        {photoUris.length && albumData?.photos
          ? albumData.photos.map((photo) => {
              return (
                <TouchableOpacity
                  onPress={() => handleSelectPhoto(photo)}
                  key={photo?._id}
                >
                  <View>
                    <Image
                      shadow={2}
                      source={{
                        uri: photo?.uri,
                      }}
                      alt={photo?.description || 'un-described image'}
                      size="xl"
                    />
                    <Text>{photo?.description}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          : null}
      </Row>
      <SelectedPhotoModal
        selectedPhoto={selectedPhoto}
        setSelectedPhoto={setSelectedPhoto}
      />
    </View>
  );
}

export default AlbumPhotos;
