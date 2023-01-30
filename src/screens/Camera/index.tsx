import { StatusBar } from 'react-native';
import { Center, Box } from 'native-base';

import CameraContainer from './CameraContainer';

function CameraScreen() {
  return (
    <Box safeAreaTop flex={1} bg="primary.800">
      <StatusBar barStyle="light-content" />
      <Center flex={1}>
        <CameraContainer />
      </Center>
    </Box>
  );
}

export default CameraScreen;
