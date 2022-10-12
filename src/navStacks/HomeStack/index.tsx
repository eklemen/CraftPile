import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Camera from '../../screens/Camera';
import Landing from '../../screens/Landing';
import ManageChildren from '../../screens/ManageChildren';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Camera" component={Camera} />
      <HomeStack.Screen name="ManageChildren" component={ManageChildren} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
