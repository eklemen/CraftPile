import { useEffect, useState } from 'react';
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
  DeleteUnsortedPhotosMutation,
  DeleteUnsortedPhotosMutationVariables,
} from '../../generated/API';
import { deleteUnsortedPhotos } from '../../graphql/mutations';

function PileActionBarSingle({ selectedPhoto, setPileData }: any) {
  const { clearComp: resetPileData } = useCompData<PileCD>(PILE);

  const [deletePhotos] = useMutation<
    DeleteUnsortedPhotosMutation,
    DeleteUnsortedPhotosMutationVariables
  >(gql(deleteUnsortedPhotos), {
    onError: (err) => console.log(err),
  });

  const deleteHandler = async () => {
    console.log('delete handler', selectedPhoto);
    await deletePhotos({
      variables: {
        input: { ids: [selectedPhoto?._id!] },
      },
      // onError: (err) => console.log('-=-=-=-=-', err),
    });
    setPileData({
      multiSelect: false,
      selectedPhotos: {},
      selectedPhoto: null,
      showAlbumSelectSheet: false,
      showChildSelectModal: false,
    });
  };
  const openAlbumSelectSheet = () =>
    setPileData({ showAlbumSelectSheet: true });
  return (
    <Box flex={1}>
      <Row w="100%" h={50} bg="white">
        <Box flex={1}>
          <Button
            h={16}
            w={16}
            colorScheme="secondary"
            variant="ghost"
            rounded="full"
            flex={1}
            onPress={deleteHandler}
          >
            <TrashCan />
          </Button>
        </Box>
        <Center flex={2} flexDirection="row">
          <Button
            w="100%"
            colorScheme="secondary"
            variant="ghost"
            onPress={() => setPileData({ showChildSelectModal: true })}
          >
            <Center flexDirection="row">
              <SwitchIcon />
              <Text
                fontSize={14}
                color="secondary.500"
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
            onPress={openAlbumSelectSheet}
          >
            <Center flexDirection="row">
              <AlbumAddIcon />
              <Text
                fontSize={14}
                color="secondary.500"
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
      {/*<ChildSelectModal*/}
      {/*  isOpen={showChildSelectModal}*/}
      {/*  onClose={() => setShowChildSelectModal(false)}*/}
      {/*/>*/}
      {/*<PileAlbumSelectSheet*/}
      {/*  isOpen={showAlbumSelect}*/}
      {/*  onClose={() => setShowAlbumSelect(false)}*/}
      {/*  onAlbumSelect={addPhotosToAlbumHandler}*/}
      {/*/>*/}
    </Box>
  );
}

export default PileActionBarSingle;
