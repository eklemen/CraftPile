import { View, Text } from 'react-native';

import commonStyles from '../../common/styles';
import CameraContainer from './CameraContainer';

function CameraScreen() {
  return (
    <View style={commonStyles.container}>
      {/*<Camera2 />*/}
      <CameraContainer />
    </View>
  );
}

export default CameraScreen;
