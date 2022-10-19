import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Camera from '../../screens/Camera';
import Landing from '../../screens/Landing';
import ManageChildren from '../../screens/ManageChildren';
import ProfileScreen from '../../screens/Profile';
import AlbumScreen from '../../screens/Albums';
import PileScreen from '../../screens/Pile';
import { RootStackParamList } from '../../types/routes';
import CameraHeader from '../../screens/Camera/CameraHeader';

const AppStack = createNativeStackNavigator<RootStackParamList>();
const MainBottomNav = createBottomTabNavigator();

function MainBottomNavScreens() {
  return (
    <MainBottomNav.Navigator>
      <MainBottomNav.Screen
        name="Camera"
        component={Camera}
        options={{headerShown: false}}
      />
      <MainBottomNav.Screen name="Pile" component={PileScreen} />
      <MainBottomNav.Screen name="Albums" component={AlbumScreen} />
      <MainBottomNav.Screen name="Profile" component={ProfileScreen} />
    </MainBottomNav.Navigator>
  );
}

function AppNavs() {
  return (
  <AppStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Landing">
    <AppStack.Screen name="Landing" component={Landing} />
    <AppStack.Screen name="MainStack" component={MainBottomNavScreens} />
    <AppStack.Screen name="ManageChildren" component={ManageChildren} />
  </AppStack.Navigator>
  );
}

export {
  MainBottomNavScreens,
  AppNavs
};
