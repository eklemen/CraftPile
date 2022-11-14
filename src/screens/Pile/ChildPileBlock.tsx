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
import ImageBox from './ImageBox';
import { ChildUnsortedPhotos } from '../../generated/API';
import useCompData from '../../context/compData/useCompData';
import { PILE, PileCD } from '../../context/constants';
import S3Image from '../../shared/S3Image';

interface Props {
  child: ChildUnsortedPhotos;
  hideSkeleton?: boolean;
}

function ChildPileBlock({ child, hideSkeleton }: Props) {
  const {
    compData: pileCompData,
    setData: setPileData,
    clearComp: resetPileCompData,
  } = useCompData<PileCD>(PILE);
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
          isOpen={Boolean(pileCompData.selectedPhoto)}
          onClose={() => {
            resetPileCompData({
              multiSelect: false,
              selectedPhotos: {},
              selectedPhoto: null,
            });
            // setPileData({
            //   selectedPhoto: null,
            // });
          }}
        >
          <Modal.Content flex={1}>
            <Modal.CloseButton />
            <Modal.Header>Contact Us</Modal.Header>
            <Modal.Body>
              <Text>{pileCompData.selectedPhoto?.thumbnailKey!}</Text>
              <S3Image
                s3Key={pileCompData.selectedPhoto?.thumbnailKey!}
                h="100%"
                w="100%"
                style={{}}
              />
              {/*<S3Image s3Key={pileCompData.selectedPhoto?.thumbnailKey!} />*/}
            </Modal.Body>
            <Modal.Footer>
              <Box>
                <Text>Hi</Text>
              </Box>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Row>
    </Box>
  );
}

export default ChildPileBlock;
