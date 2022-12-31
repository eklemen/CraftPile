import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';

import Camera from '../../screens/Camera';
import ManageChildren from '../../screens/ManageChildren';
import ProfileScreen from '../../screens/Profile';
import AlbumScreen from '../../screens/Albums';
import PileScreen from '../../screens/Pile';
import {
  AlbumStackParamList,
  MainStackParamList, ProfileStackParamList,
  RootStackParamList,
} from '../../types/routes';
import CameraIcon from '../../appIcons/CameraIcon';
import AlbumIcon from '../../appIcons/AlbumIcon';
import PileIcon from '../../appIcons/PileIcon';
import ProfileIcon from '../../appIcons/ProfileIcon';
import AlbumPhotos from '../../screens/AlbumPhotos';
import ViewAllAlbums from '../../screens/ViewAllAlbums';
import { gql, useQuery } from '@apollo/client';
import { GetUserQuery } from '../../generated/API';
import { getUser } from '../../graphql/queries';

const AppStack = createNativeStackNavigator<RootStackParamList>();
const MainBottomNav = createBottomTabNavigator<MainStackParamList>();
const AlbumStack = createNativeStackNavigator<AlbumStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const ManageChildrenStack = createNativeStackNavigator<any>();

function AlbumNavs() {
  return (
    <AlbumStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AlbumScreen"
    >
      <AlbumStack.Screen name="AlbumScreen" component={AlbumScreen} />
      <AlbumStack.Screen name="ViewAllAlbums" component={ViewAllAlbums} />
      <AlbumStack.Screen name="AlbumPhotos" component={AlbumPhotos} />
    </AlbumStack.Navigator>
  );
}

function ProfileNavs() {
  return (
    <ProfileStack.Navigator
      initialRouteName="ProfileScreen"
    >
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="ManageChildren"
        component={ManageChildren}
      />
    </ProfileStack.Navigator>
  );
}

function MainBottomNavScreens() {
  const { colors, fontConfig } = useTheme();
  const {data: userData } = useQuery<GetUserQuery>(gql(getUser));
  if (!userData?.getUser.children?.length) {
    return (
      <ManageChildrenStack.Navigator>
        <ManageChildrenStack.Screen
          name="ManageChildren"
          component={ManageChildren}
          options={{ headerShown: false }}
        />
      </ManageChildrenStack.Navigator>
    );
  }
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
        headerShown: false,
      }}
      initialRouteName='Camera'
    >
      <MainBottomNav.Screen
        name="Camera"
        component={Camera}
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.primary['400'],
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
        component={AlbumNavs}
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
        component={ProfileNavs}
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
      initialRouteName="MainStack"
    >
      <AppStack.Screen name="MainStack" component={MainBottomNavScreens} />
    </AppStack.Navigator>
  );
}

export { MainBottomNavScreens, AppNavs };
