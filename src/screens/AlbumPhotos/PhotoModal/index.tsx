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
import { Image } from 'react-native-expo-image-cache';
import useCompData from '../../../context/compData/useCompData';
import AlbumGrid from './AlbumGrid';
import {
  GetAlbumsForChildQuery, GetAlbumsForChildQueryVariables,
  Photo,
} from '../../../generated/API';
import { useState } from 'react';
import PhotoModalActionBar from './PhotoModalActionBar';
import ChildSelect from './ChildSelect';
import { gql, useQuery } from '@apollo/client';
import { getAlbumsForChild } from '../../../graphql/queries';

interface Props {
  selectedPhoto: Photo;
  setSelectedPhoto: (photo: undefined) => void;
  onClose: () => void;
  showAlbumSelectModal: boolean;
  setShowAlbumSelectModal: () => void;
  handleDelete: () => void;
  onAlbumSelect: () => void;
  albumId: string;
}

function PhotoModal({
  selectedPhoto,
  setSelectedPhoto,
  onClose,
  showAlbumSelectModal,
  albumId,
}: Props) {
  const [showChildSelectModal, setShowChildSelectModal] = useState(false);
  const { loading: loadingAlbums, data, error } = useQuery<
    GetAlbumsForChildQuery,
    GetAlbumsForChildQueryVariables
    >(gql(getAlbumsForChild));
  const { compData: cachedPhotos } = useCompData<CachedUrlsCD>(CACHED_URLS);
  return (
    <>
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
                    selectedPhoto={selectedPhoto}
                    loading={loadingAlbums}
                    data={data}
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
                  onDeleteSuccess={onClose}
                  setShowAlbumSelectModal={() => {}}
                  setShowChildSelectModal={() => {
                    setShowChildSelectModal(true);
                  }}
                  albumId={albumId}
                />
              </Modal.Footer>
            </>
          )}
        </Modal.Content>
      </Modal>
      <ChildSelect
        isOpen={showChildSelectModal}
        onClose={() => {
          setShowChildSelectModal(false);
          setSelectedPhoto(undefined);
        }}
        currentAlbumId={albumId}
        selectedPhoto={selectedPhoto}
      />
    </>
  );
}

export default PhotoModal;
