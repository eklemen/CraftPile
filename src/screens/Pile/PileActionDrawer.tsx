import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Center, Row, Text } from 'native-base';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { gql, useMutation } from '@apollo/client';
import isEmpty from 'lodash.isempty';
import lodashKeys from 'lodash.keys';
import TrashCan from '../../appIcons/TrashCan';
import { PILE, PileCD } from '../../context/constants';
import SwitchIcon from '../../appIcons/SwitchIcon';
import AlbumAddIcon from '../../appIcons/AlbumAddIcon';
import useCompData from '../../context/compData/useCompData';
import {
  AddUnsortedPhotosToAlbumMutation,
  AddUnsortedPhotosToAlbumMutationVariables,
  DeleteUnsortedPhotosMutation,
  DeleteUnsortedPhotosMutationVariables,
} from '../../generated/API';
import {
  addUnsortedPhotosToAlbum,
  deleteUnsortedPhotos,
} from '../../graphql/mutations';
import PileAlbumSelectSheet from './PileAlbumSelectSheet';

function PileActionDrawer() {
  const {
    compData: pileCompData,
    clearComp: resetPileData,
    setData: setPileData,
  } = useCompData<PileCD>(PILE);
  const [disableDrawerBtn, setDisableDrawerBtn] = useState(false);

  const [deletePhotos] = useMutation<
    DeleteUnsortedPhotosMutation,
    DeleteUnsortedPhotosMutationVariables
  >(gql(deleteUnsortedPhotos));

  const [addPhotosToAlbum] = useMutation<
    AddUnsortedPhotosToAlbumMutation,
    AddUnsortedPhotosToAlbumMutationVariables
  >(gql(addUnsortedPhotosToAlbum));

  // animation
  const drawerPosition = useSharedValue(70);
  const animatedDrawer = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: drawerPosition.value }],
    };
  });
  useEffect(() => {
    if (pileCompData.multiSelect) {
      drawerPosition.value = withTiming(-32, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });
    } else if (pileCompData.multiSelect === false) {
      drawerPosition.value = withTiming(70, {
        duration: 250,
        easing: Easing.in(Easing.exp),
      });
    }
  }, [pileCompData.multiSelect]);
  // end animation

  const isMultiSelectEmpty = isEmpty(pileCompData?.selectedPhotos);

  const isMoreThanOneChildIncluded = () => {
    const values =
      pileCompData?.selectedPhotos &&
      Object.values(pileCompData.selectedPhotos);
    const selectedChildIds = values?.map((photo) => photo.childId);
    const uniqueSet = new Set(selectedChildIds).size;
    return uniqueSet !== 1;
  };
  useEffect(() => {
    const shouldDisable = isMoreThanOneChildIncluded();
    if (shouldDisable) {
      setDisableDrawerBtn(true);
    } else {
      setDisableDrawerBtn(false);
    }
  }, [pileCompData.selectedPhotos]);
  console.log(
    'Object.keys(pileCompData?.selectedPhotos)-------->',
    Object.keys(pileCompData?.selectedPhotos)
  );
  const deleteHandler = async () => {
    const ids = Object.keys(pileCompData?.selectedPhotos);
    if (ids) {
      await deletePhotos({
        variables: {
          input: { ids },
        },
      });
      // resetPileData({
      //   multiSelect: false,
      //   selectedPhotos: {},
      //   selectedPhoto: null,
      // });
    }
  };
  const openAlbumSelect = async () => {
    const ids = lodashKeys(pileCompData?.selectedPhotos);
    if (ids.length) {
      setPileData({ showAlbumSelectSheet: true });
    }
  };
  const addPhotosToAlbumHandler = async (albumId: string) => {
    const ids = Object.keys(pileCompData?.selectedPhotos);
    if (ids.length) {
      await addPhotosToAlbum({
        variables: {
          input: { ids, albumId },
        },
      });
      resetPileData({
        multiSelect: false,
        selectedPhotos: {},
        selectedPhoto: null,
      });
      setPileData({ showAlbumSelectSheet: false });
    }
  };
  return (
    <Animated.View style={[animatedDrawer, { marginTop: -32 }]}>
      <Row w="100%" h={73} bg="white">
        <Box flex={1}>
          <Button
            h={16}
            w={16}
            colorScheme="secondary"
            variant="ghost"
            rounded="full"
            disabled={isMultiSelectEmpty}
            flex={1}
            onPress={deleteHandler}
          >
            <TrashCan disabled={isMultiSelectEmpty} />
          </Button>
        </Box>
        <Center flex={2} flexDirection="row">
          <Button
            w="100%"
            colorScheme="secondary"
            variant="ghost"
            onPress={() => {
              console.log('pileCompData-------->', pileCompData);
              setPileData({ showChildSelectModal: true });
            }}
            disabled={disableDrawerBtn}
          >
            <Center flexDirection="row">
              <SwitchIcon disabled={disableDrawerBtn} />
              <Text
                fontSize={14}
                color={disableDrawerBtn ? 'gray.400' : 'secondary.500'}
                fontFamily="body"
                fontWeight={700}
                ml={2}
              >
                Change Child
              </Text>
            </Center>
          </Button>
        </Center>
        <Box
          flex={2}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            w="100%"
            colorScheme="secondary"
            variant="ghost"
            onPress={openAlbumSelect}
            disabled={disableDrawerBtn}
          >
            <Center flexDirection="row">
              <AlbumAddIcon disabled={disableDrawerBtn} />
              <Text
                fontSize={14}
                color={disableDrawerBtn ? 'gray.400' : 'secondary.500'}
                fontFamily="body"
                fontWeight={700}
                ml={2}
              >
                Add to Album
              </Text>
            </Center>
          </Button>
        </Box>
      </Row>
      <PileAlbumSelectSheet
        isOpen={pileCompData.showAlbumSelectSheet}
        onClose={() => setPileData({ showAlbumSelectSheet: false })}
        onAlbumSelect={addPhotosToAlbumHandler}
        pileCompData={pileCompData}
      />
    </Animated.View>
  );
}

export default PileActionDrawer;
