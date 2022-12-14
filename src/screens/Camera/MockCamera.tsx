import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'native-base';
import { View, Text } from 'react-native';

import { cameraStyles as styles } from './styles';

function MockCamera() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={[styles.camera, { backgroundColor: 'black' }]}>
        <View style={styles.buttonContainer}>
          <Button variant="ghost" onPress={() => {}}>
            <Text style={styles.text}>Photos</Text>
          </Button>
          <Button variant="ghost" onPress={() => {}}>
            <Entypo name="circle" size={64} color="white" />
          </Button>
          <View>
            <Button
              variant="ghost"
              onPress={() => navigation.navigate('ManageChildren')}
            >
              <Text style={styles.text}>Albums</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

export default MockCamera;
