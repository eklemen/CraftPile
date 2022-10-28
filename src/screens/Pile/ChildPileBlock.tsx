import { Box, Heading, Pressable, Row } from 'native-base';
import ImageBox from './ImageBox';
import { ChildUnsortedPhotos, UnsortedPhoto } from '../../generated/API';
import useCompData from '../../context/compData/useCompData';
import { PILE, PileCD } from '../../context/constants';
import { useEffect } from 'react';

interface Props {
  child: ChildUnsortedPhotos;
}

function ChildPileBlock({ child }: Props) {
  const {
    compData: pileCompData,
    setData: setPileData,
    clearComp,
  } = useCompData<PileCD>(PILE);
  if (!child?.photos?.length) return null;
  useEffect(() => {
    clearComp();
  }, []);
  return (
    <Box px={4} mb={5}>
      <Heading size="md">{child?._id?.name}</Heading>
      <Row flexWrap="wrap">
        {child?.photos?.map((photo) => {
          const isMultiSelected = pileCompData.selectedPhotos?.hasOwnProperty(
            photo?._id as string
          );
          return (
            <Pressable
              key={photo?._id}
              w="50%"
              pr={2}
              my={1}
              onPress={() => {
                if (pileCompData.multiSelect) {
                  if (
                    pileCompData?.selectedPhotos?.hasOwnProperty(
                      photo?._id as string
                    )
                  ) {
                    const selectedPhotos = { ...pileCompData.selectedPhotos };
                    delete selectedPhotos[photo?._id as string];
                    setPileData({
                      selectedPhotos,
                    });
                  } else {
                    setPileData({
                      selectedPhotos: {
                        ...pileCompData.selectedPhotos,
                        [photo?._id as string]: photo!,
                      },
                    });
                  }
                } else {
                  setPileData({
                    selectedPhoto: photo,
                  });
                }
              }}
            >
              <ImageBox
                photo={photo as UnsortedPhoto}
                isMultiSelected={isMultiSelected}
              />
            </Pressable>
          );
        })}
      </Row>
    </Box>
  );
}

export default ChildPileBlock;
