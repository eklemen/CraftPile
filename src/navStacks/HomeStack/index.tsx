import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';

import Camera from '../../screens/Camera';
import Landing from '../../screens/Landing';
import ManageChildren from '../../screens/ManageChildren';
import ProfileScreen from '../../screens/Profile';
import AlbumScreen from '../../screens/Albums';
import PileScreen from '../../screens/Pile';
import { RootStackParamList } from '../../types/routes';
import CameraIcon from '../../appIcons/CameraIcon';
import AlbumIcon from '../../appIcons/AlbumIcon';
import PileIcon from '../../appIcons/PileIcon';
import ProfileIcon from '../../appIcons/ProfileIcon';

const AppStack = createNativeStackNavigator<RootStackParamList>();
const MainBottomNav = createBottomTabNavigator();

function MainBottomNavScreens() {
  const { colors, fontConfig } = useTheme();
  return (
    <MainBottomNav.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopColor: 'transparent',
        },
        tabBarLabelStyle: {
          fontFamily: fontConfig?.Nunito[500].normal,
          fontSize: 14,
        },
      }}
    >
      <MainBottomNav.Screen
        name="Camera"
        component={Camera}
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.primary['500'],
            borderTopColor: 'transparent',
          },
          tabBarActiveTintColor: colors.white,
          tabBarIcon: ({ focused, color }) => (
            <CameraIcon size={30} focused={focused} color={color} />
          ),
          tabBarAccessibilityLabel: 'Camera',
        }}
      />
      <MainBottomNav.Screen
        name="Pile"
        component={PileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <PileIcon size={30} focused={focused} color={color} />
          ),
          tabBarActiveTintColor: colors.secondary['500'],
          tabBarInactiveTintColor: colors.primary['500'],
          tabBarAccessibilityLabel: 'Pile',
        }}
      />
      <MainBottomNav.Screen
        name="Albums"
        component={AlbumScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AlbumIcon size={26} focused={focused} color={color} />
          ),
          tabBarActiveTintColor: colors.secondary['500'],
          tabBarInactiveTintColor: colors.primary['500'],
          tabBarAccessibilityLabel: 'Albums',
        }}
      />
      <MainBottomNav.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <ProfileIcon size={30} focused={focused} color={color} />
          ),
          tabBarActiveTintColor: colors.secondary['500'],
          tabBarInactiveTintColor: colors.primary['500'],
          tabBarAccessibilityLabel: 'Profile',
        }}
      />
    </MainBottomNav.Navigator>
  );
}

function AppNavs() {
  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Landing"
    >
      <AppStack.Screen name="Landing" component={Landing} />
      <AppStack.Screen name="MainStack" component={MainBottomNavScreens} />
      <AppStack.Screen name="ManageChildren" component={ManageChildren} />
    </AppStack.Navigator>
  );
}

export { MainBottomNavScreens, AppNavs };
