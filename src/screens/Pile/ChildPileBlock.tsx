import { View, Text } from 'react-native';
import { Box, Heading, Row } from 'native-base';
import ImageBox from './ImageBox';
import { ChildUnsortedPhotos, UnsortedPhoto } from '../../generated/API';

interface Props {
  child: ChildUnsortedPhotos;
}

function ChildPileBlock({ child }: Props) {
  return (
    <Box px={4} mb={5}>
      <Heading size="md">{child?._id?.name}</Heading>
      <Row flexWrap="wrap">
        {child?.photos?.map((photo) => (
          <ImageBox key={photo?._id} photo={photo as UnsortedPhoto} />
        ))}
      </Row>
    </Box>
  );
}

export default ChildPileBlock;
