import {
  Box,
  Heading,
  Image,
  Modal,
  Pressable,
  Row,
  Skeleton,
  Text,
} from 'native-base';
import { useState } from 'react';
import ImageBox from './ImageBox';
import { ChildUnsortedPhotos } from '../../generated/API';
import useCompData from '../../context/compData/useCompData';
import {
  CACHED_URLS,
  CachedUrlsCD,
  PILE,
  PileCD,
} from '../../context/constants';
import { Dimensions } from 'react-native';
import PileActionBarSingle from './PileActionBarSingle';

interface Props {
  child: ChildUnsortedPhotos;
  hideSkeleton?: boolean;
}

function ChildPileBlock({ child, hideSkeleton }: Props) {
  const [showImageModal, setShowImageModal] = useState(false);
  const {
    compData: pileCompData,
    setData: setPileData,
    clearComp: resetPileCompData,
  } = useCompData<PileCD>(PILE);
  const { compData: cachedPhotos, setData: setCachedPhoto } =
    useCompData<CachedUrlsCD>(CACHED_URLS);
  if (!child?.photos?.length) return null;
  return (
    <Box px={4} mb={5}>
      <Skeleton
        mb={4}
        width="65%"
        height="22"
        rounded="md"
        isLoaded={hideSkeleton}
      >
        <Heading size="md">{child?.childName}</Heading>
      </Skeleton>
      <Row flexWrap="wrap">
        {child.photos?.map((photo) => {
          const isMultiSelected = pileCompData.selectedPhotos?.hasOwnProperty(
            photo?._id
          );
          return (
            <Pressable
              key={photo?._id}
              w="50%"
              pr={2}
              my={1}
              onPress={() => {
                if (pileCompData.multiSelect) {
                  // if photo is selected, unselect it
                  if (
                    pileCompData?.selectedPhotos?.hasOwnProperty(photo?._id)
                  ) {
                    const selectedPhotos = { ...pileCompData.selectedPhotos };
                    delete selectedPhotos[photo?._id];
                    setPileData({
                      selectedPhotos,
                    });
                  } else {
                    // otherwise add photo
                    setPileData({
                      selectedPhotos: {
                        ...pileCompData.selectedPhotos,
                        [photo?._id]: photo!,
                      },
                    });
                  }
                } else {
                  // Single select
                  setPileData({
                    selectedPhoto: photo,
                  });
                  setShowImageModal(true);
                }
              }}
            >
              <ImageBox
                photoUri={photo.thumbnailKey}
                isMultiSelected={isMultiSelected}
              />
            </Pressable>
          );
        })}
        <Modal
          size="full"
          isOpen={showImageModal}
          onClose={() => {
            resetPileCompData({
              multiSelect: false,
              selectedPhotos: {},
              selectedPhoto: null,
            });
            setShowImageModal(false);
          }}
          _backdrop={{
            opacity: 0.65,
          }}
        >
          <Modal.Content flex={1}>
            <Modal.CloseButton />
            <Modal.Header>Image preview</Modal.Header>
            <Modal.Body
              h={Dimensions.get('window').height * 0.6}
              alignItems="stretch"
              display="flex"
            >
              <Image
                source={{
                  uri: cachedPhotos[pileCompData.selectedPhoto?.thumbnailKey!],
                }}
                alt={'un-described image'}
                resizeMode="contain"
                w="100%"
                h="95%"
              />
            </Modal.Body>
            <Modal.Footer>
              <PileActionBarSingle selectedPhoto={pileCompData.selectedPhoto} />
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Row>
    </Box>
  );
}

export default ChildPileBlock;
