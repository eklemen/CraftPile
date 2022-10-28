import { Box } from 'native-base';
import S3Image from '../../shared/S3Image';
import { UnsortedPhoto } from '../../generated/API';
import styles from './styles';
import Checkmark from '../../appIcons/Checkmark';

interface Props {
  photo: UnsortedPhoto;
  isMultiSelected?: boolean;
}

function ImageBox({ photo, isMultiSelected }: Props) {
  return (
    <Box style={styles.imageBox}>
      {isMultiSelected && <Checkmark styles={styles.checkmark} />}
      <S3Image s3Key={photo?.thumbnailKey as string} />
    </Box>
  );
}

export default ImageBox;
