import { Box, Button, Column, Heading, Image, Modal, Row } from 'native-base';
import { Dimensions, FlatList, StatusBar } from 'react-native';
import { useQuery, gql, useMutation } from '@apollo/client';

import {
  AddUnsortedPhotosToAlbumMutation,
  AddUnsortedPhotosToAlbumMutationVariables,
  GetChildrenUnsortedPhotosQuery,
} from '../../generated/API';
import { getChildrenUnsortedPhotos } from '../../graphql/queries';
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
import PileActionBarSingle from './PileActionBarSingle';
import PileAlbumSelectSheet from './PileAlbumSelectSheet';
import { addUnsortedPhotosToAlbum } from '../../graphql/mutations';

interface Props {
  navigation: AlbumScreenNavigationProp;
}

function PileScreen({}: Props) {
  const { compData: pileCompData, setData: setPileData } =
    useCompData<PileCD>(PILE);
  const { setData: setCachedPhotos, compData: cachedPhotos } =
    useCompData<CachedUrlsCD>(CACHED_URLS);

  const {
    loading: pilePhotosLoading,
    data: { getChildrenUnsortedPhotos: pilePhotos } = {},
    error: pilePhotosError,
  } = useQuery<GetChildrenUnsortedPhotosQuery>(gql(getChildrenUnsortedPhotos), {
    onCompleted: async (data) => {
      const photosArray = data.getChildrenUnsortedPhotos
        .map((child) => child.photos)
        .flat();
      const photoUrlPromises = photosArray.map((photo) =>
        Storage.get(photo.thumbnailKey, {
          contentType: 'image/jpeg',
        })
      );
      const res: string[] = await Promise.all(photoUrlPromises);
      const obj = res.reduce((acc, url, i) => {
        acc[photosArray[i].thumbnailKey] = url;
        return acc;
      }, {} as CachedUrlsCD);
      setCachedPhotos(obj);
    },
  });
  const [addPhotosToAlbum] = useMutation<
    AddUnsortedPhotosToAlbumMutation,
    AddUnsortedPhotosToAlbumMutationVariables
  >(gql(addUnsortedPhotosToAlbum));
  const addPhotosToAlbumHandler = async (albumId: string) => {
    await addPhotosToAlbum({
      variables: {
        input: { ids: [pileCompData?.selectedPhoto?._id!], albumId },
      },
    });
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
    pilePhotos && pilePhotos.every((obj) => !obj.photos.length);

  return (
    <Column safeAreaTop mt={30} h="100%" position="relative">
      <StatusBar barStyle="dark-content" />
      <Row alignItems="center" justifyContent="space-between" px={3} mb={5}>
        <Heading fontSize={34}>Pile</Heading>
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
      </Row>
      {isEmptyState && (
        <Row>
          <Heading fontSize={36} textAlign="center" w="100%">
            {`Great job!\nYou have no crafts in your pile.`}
          </Heading>
        </Row>
      )}
      <FlatList
        data={pilePhotos}
        renderItem={({ item }) => (
          <ChildPileBlock
            child={item}
            hideSkeleton={!pilePhotosLoading && !pilePhotosError}
          />
        )}
      />

      <PileActionDrawer />
      <PileAlbumSelectSheet
        isOpen={pileCompData.showAlbumSelectSheet}
        onClose={() => setPileData({ showAlbumSelectSheet: false })}
        onAlbumSelect={addPhotosToAlbumHandler}
        pileCompData={pileCompData}
      />
      <ChildSelectModal
        isOpen={pileCompData.showChildSelectModal}
        setPileData={setPileData}
      />
      {/* Image Modal*/}
      <Modal
        size="full"
        isOpen={Boolean(pileCompData.selectedPhoto)}
        onClose={() => {
          setPileData({
            multiSelect: false,
            selectedPhotos: {},
            selectedPhoto: null,
            showChildSelectModal: false,
          });
        }}
        _backdrop={{
          opacity: 0.65,
        }}
      >
        <Modal.Content flex={1}>
          <Modal.CloseButton />
          {pileCompData.showAlbumSelectModal ? (
            <>
              <PileAlbumSelectSheet
                isOpen={pileCompData.showAlbumSelectModal}
                onClose={() => setPileData({ showAlbumSelectModal: false })}
                onAlbumSelect={addPhotosToAlbumHandler}
                pileCompData={pileCompData}
              />
            </>
          ) : (
            <>
              <Modal.Body
                h={Dimensions.get('window').height * 0.6}
                alignItems="stretch"
                display="flex"
              >
                <Image
                  source={{
                    uri: cachedPhotos[
                      pileCompData.selectedPhoto?.thumbnailKey!
                    ],
                  }}
                  alt={'un-described image'}
                  resizeMode="contain"
                  w="100%"
                  h="95%"
                />
              </Modal.Body>
              <Modal.Footer>
                <PileActionBarSingle
                  selectedPhoto={pileCompData.selectedPhoto}
                  setPileData={setPileData}
                />
              </Modal.Footer>
            </>
          )}
        </Modal.Content>
      </Modal>
    </Column>
  );
}

export default PileScreen;
