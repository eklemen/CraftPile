import { Dimensions } from 'react-native';
import { CACHED_URLS, CachedUrlsCD } from '../../../context/constants';
import {
  Actionsheet,
  Box,
  Column,
  Heading,
  Modal,
  Row,
  Skeleton,
  Text,
} from 'native-base';
import PileAlbumSelectSheet from '../../../screens/Pile/PileAlbumSelectSheet';
import { Image } from 'react-native-expo-image-cache';
import PileActionBarSingle from '../../../screens/Pile/PileActionBarSingle';
import useCompData from '../../../context/compData/useCompData';
import AlbumGrid from '../../../shared/AlbumGrid';
import { gql, useLazyQuery } from '@apollo/client';
import {
  GetAlbumsForChildQuery,
  GetAlbumsForChildQueryVariables,
  Photo,
} from '../../../generated/API';
import { getAlbumsForChild } from '../../../graphql/queries';
import { useEffect } from 'react';
import PhotoModalActionBar from './PhotoModalActionBar';

interface Props {
  selectedPhoto: Photo;
  onClose: () => void;
  showAlbumSelectModal: boolean;
  setShowAlbumSelectModal: () => void;
  onAlbumSelect: () => void;
}

function PhotoModal({
  selectedPhoto,
  onClose,
  showAlbumSelectModal,
  setShowAlbumSelectModal,
  onAlbumSelect,
}: Props) {
  const { compData: cachedPhotos } = useCompData<CachedUrlsCD>(CACHED_URLS);
  const [getAlbums, { loading, data, error }] = useLazyQuery<
    GetAlbumsForChildQuery,
    GetAlbumsForChildQueryVariables
  >(gql(getAlbumsForChild));
  useEffect(() => {
    if (Boolean(selectedPhoto)) {
      getAlbums({
        variables: {
          input: {
            childId: '',
          },
        },
      });
    }
  }, [selectedPhoto]);
  return (
    <Modal
      size="full"
      isOpen={Boolean(selectedPhoto!)}
      onClose={onClose}
      _backdrop={{
        opacity: 0.65,
      }}
    >
      <Modal.Content flex={1}>
        <Modal.CloseButton />
        {showAlbumSelectModal ? (
          <Actionsheet
            isOpen={showAlbumSelectModal}
            onClose={onClose}
            height="100%"
          >
            <Actionsheet.Content px={4}>
              <Column h="100%" w="100%">
                <Heading size="2xl" w="100%" mb={4}>
                  Add to album
                </Heading>
                <Row alignItems="center" mb={4}>
                  <Skeleton isLoaded={!false}>
                    <Box
                      h={35}
                      w={35}
                      rounded="full"
                      bg="primary.100"
                      alignItems="center"
                      justifyContent="center"
                      mr={3}
                    >
                      <Text color="white">P</Text>
                    </Box>
                    <Heading size="md">
                      {`${data?.getAlbumsForChild?.name}'s album`}
                    </Heading>
                  </Skeleton>
                </Row>
                <AlbumGrid
                  loading={loading}
                  data={data}
                  onAlbumSelect={onAlbumSelect}
                />
              </Column>
            </Actionsheet.Content>
          </Actionsheet>
        ) : (
          <>
            <Modal.Body
              h={Dimensions.get('window').height * 0.6}
              alignItems="stretch"
              display="flex"
            >
              <Image
                uri={cachedPhotos[selectedPhoto?.thumbnailKey!]}
                style={{
                  resizeMode: 'contain',
                  width: '100%',
                  height: '95%',
                }}
              />
            </Modal.Body>
            <Modal.Footer>
              <PhotoModalActionBar
                selectedPhoto={selectedPhoto}
                onDeleteSuccess={() => {}}
                setShowAlbumSelectModal={() => {}}
                setShowChildSelectModal={() => {}}
              />
            </Modal.Footer>
          </>
        )}
      </Modal.Content>
    </Modal>
  );
}

export default PhotoModal;
