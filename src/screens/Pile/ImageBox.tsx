import { Box } from 'native-base';
import S3Image from '../../shared/S3Image';
import styles from './styles';
import Checkmark from '../../appIcons/Checkmark';

interface Props {
  photoUri: string;
  isMultiSelected?: boolean;
}

function ImageBox({ photoUri, isMultiSelected }: Props) {
  return (
    <Box style={styles.imageBox}>
      {isMultiSelected && <Checkmark styles={styles.checkmark} />}
      <S3Image s3Key={photoUri as string} />
    </Box>
  );
}

export default ImageBox;
