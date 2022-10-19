import { View } from 'react-native';
import { Center, Box } from 'native-base';

import commonStyles from '../../common/styles';
import CameraContainer from './CameraContainer';
import CameraHeader from './CameraHeader';

function CameraScreen() {
  return (
    <Box safeAreaTop flex={1} bg="primary.800">
    <Center flex={1}>
      <CameraHeader />
      <CameraContainer />
    </Center>
    </Box>
  );
}

export default CameraScreen;
