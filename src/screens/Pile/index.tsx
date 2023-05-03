import { Button, Column, Heading, Modal, Row } from 'native-base';
import { FlatList, StatusBar } from 'react-native';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';

import { AlbumScreenNavigationProp } from '../../types/routes';
import ChildPileBlock from './ChildPileBlock';
import useCompData from '../../context/compData/useCompData';
import {
  CACHED_URLS,
  CachedUrlsCD,
  PILE,
  PileCD,
} from '../../context/constants';
import PileActionDrawer from './PileActionDrawer';
import Storage from '@aws-amplify/storage';
import ChildSelectModal from '../../shared/ChildSelectModal';
import PileImageViewModal from '../../shared/PileImageViewModal';
import { useCallback } from 'react';

interface Props {
  navigation: AlbumScreenNavigationProp;
}

function PileScreen({}: Props) {
  const { compData: pileCompData, setData: setPileData } =
    useCompData<PileCD>(PILE);
  const { setData: setCachedPhotos, compData: cachedPhotos } =
    useCompData<CachedUrlsCD>(CACHED_URLS);

  // TODO: Get children unsorted photos
  // const {
  //   loading: pilePhotosLoading,
  //   data: { getChildrenUnsortedPhotos: pilePhotos } = {},
  //   error: pilePhotosError,
  //   refetch: pilePhotosRefetch,
  // } = useQuery<GetChildrenUnsortedPhotosQuery>(gql(getChildrenUnsortedPhotos), {
  //   fetchPolicy: 'cache-and-network',
  // });
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      return () => {
        isActive = false;
      };
    }, [])
  );
  // const [addPhotosToAlbum] = useMutation<
  //   AddUnsortedPhotosToAlbumMutation,
  //   AddUnsortedPhotosToAlbumMutationVariables
  // >(gql(addUnsortedPhotosToAlbum));
  const addPhotosToAlbumHandler = async (albumId: string) => {
    // await addPhotosToAlbum({
    //   variables: {
    //     input: { ids: [pileCompData?.selectedPhoto?._id!], albumId },
    //   },
    // });
    setPileData({
      multiSelect: false,
      selectedPhotos: {},
      showChildSelectModal: false,
      selectedPhoto: null,
      showAlbumSelectModal: false,
      showAlbumSelectSheet: false,
    });
  };

  const isEmptyState =
    true; /*pilePhotos && pilePhotos.every((obj) => !obj.photos.length);*/

  return (
    <Column safeAreaTop mt={30} h="100%" position="relative">
      <StatusBar barStyle="dark-content" />
      <Row alignItems="center" justifyContent="space-between" px={3} mb={5}>
        <Heading fontSize={34}>Pile</Heading>
        {isEmptyState ? null : (
          <Button
            colorScheme="secondary"
            size="sm"
            rounded="full"
            onPress={() => {
              const payload: Partial<PileCD> = {
                multiSelect: !pileCompData.multiSelect,
              };
              if (pileCompData.multiSelect) {
                payload.selectedPhotos = {};
                setPileData(payload);
              } else {
                setPileData(payload);
              }
            }}
          >
            {pileCompData.multiSelect ? 'Cancel' : 'Select'}
          </Button>
        )}
      </Row>
      {isEmptyState && (
        <Row>
          <Heading fontSize={36} textAlign="center" w="100%">
            {`Great job!\nYou have no crafts in your pile.`}
          </Heading>
        </Row>
      )}
      <FlatList
        data={[]}
        renderItem={({ item }) => (
          <ChildPileBlock
            child={item}
            hideSkeleton={true /*!pilePhotosLoading && !pilePhotosError*/}
          />
        )}
      />

      <PileActionDrawer />
      <ChildSelectModal
        isOpen={pileCompData.showChildSelectModal}
        setPileData={setPileData}
      />
      {/* Image Modal*/}
      <PileImageViewModal
        pileCompData={pileCompData}
        setPileData={setPileData}
        addPhotosToAlbumHandler={addPhotosToAlbumHandler}
      />
    </Column>
  );
}

export default PileScreen;
