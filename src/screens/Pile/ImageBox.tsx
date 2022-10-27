import { View, Text } from 'react-native';
import S3Image from '../../shared/S3Image';
import { Box } from 'native-base';
import { UnsortedPhoto } from '../../generated/API';

interface Props {
  photo: UnsortedPhoto;
}

function ImageBox({ photo }: Props) {
  return (
    <Box
      w="50%"
      h={200}
      pr={2}
      my={2}
      alignItems="center"
      style={{
        overflow: 'hidden',
        aspectRatio: 1,
      }}
    >
      <S3Image s3Key={photo?.thumbnailKey as string} />
    </Box>
  );
}

export default ImageBox;
