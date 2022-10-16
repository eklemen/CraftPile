import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Camera from '../../screens/Camera';
import Landing from '../../screens/Landing';
import ManageChildren from '../../screens/ManageChildren';
import AlbumScreen from '../../screens/Albums';

const AppStack = createNativeStackNavigator();
const MainBottomNav = createBottomTabNavigator();

function MainBottomNavScreens() {
  return (
    <MainBottomNav.Navigator>
      <MainBottomNav.Screen name="Camera" component={Camera} />
      <MainBottomNav.Screen name="Pile" component={AlbumScreen} />
      <MainBottomNav.Screen name="Albums" component={AlbumScreen} />
      <MainBottomNav.Screen name="Profile" component={ManageChildren} />
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
