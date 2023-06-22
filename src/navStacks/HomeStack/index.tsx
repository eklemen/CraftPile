import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'native-base';

import AlbumIcon from '../../appIcons/AlbumIcon';
import CameraIcon from '../../appIcons/CameraIcon';
import PileIcon from '../../appIcons/PileIcon';
import ProfileIcon from '../../appIcons/ProfileIcon';
import { useAuth } from '../../context/authContext/authContextStore';
import { useGetUserOutputQuery } from '../../generated/graphql';
import AlbumPhotos from '../../screens/AlbumPhotos';
import AlbumScreen from '../../screens/Albums';
import Camera from '../../screens/Camera';
import Home from '../../screens/Home';
import Login from '../../screens/Login';
import ManageChildren from '../../screens/ManageChildren';
import PileScreen from '../../screens/Pile';
import ProfileScreen from '../../screens/Profile';
import Register from '../../screens/Register';
import VerificationCode from '../../screens/VerificationCode';
import ViewAllAlbums from '../../screens/ViewAllAlbums';
import {
  AlbumStackParamList,
  MainStackParamList,
  ProfileStackParamList,
  RootStackParamList,
} from '../../types/routes';

const AppStack = createNativeStackNavigator<RootStackParamList>();
const MainBottomNav = createBottomTabNavigator<MainStackParamList>();
// const AlbumStack = createNativeStackNavigator<AlbumStackParamList>();
// const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const ManageChildrenStack = createNativeStackNavigator<any>();
// // TODO: Add types for this navigator
const AuthStack = createNativeStackNavigator<any>();
//
// function AlbumNavs() {
//   return (
//     <AlbumStack.Navigator
//       screenOptions={{ headerShown: false }}
//       initialRouteName="AlbumScreen"
//     >
//       <AlbumStack.Screen name="AlbumScreen" component={AlbumScreen} />
//       <AlbumStack.Screen name="ViewAllAlbums" component={ViewAllAlbums} />
//       <AlbumStack.Screen name="AlbumPhotos" component={AlbumPhotos} />
//     </AlbumStack.Navigator>
//   );
// }
//
// function ProfileNavs() {
//   return (
//     <ProfileStack.Navigator initialRouteName="ProfileScreen">
//       <ProfileStack.Screen
//         name="ProfileScreen"
//         component={ProfileScreen}
//         options={{ headerShown: false }}
//       />
//       <ProfileStack.Screen
//         name="ManageChildren"
//         component={ManageChildren}
//         options={{ title: '' }}
//       />
//     </ProfileStack.Navigator>
//   );
// }
//
function AuthNavs() {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LoginScreen"
    >
      <AuthStack.Screen name="LoginScreen" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="VerificationCode" component={VerificationCode} />
    </AuthStack.Navigator>
  );
}

function MainBottomNavScreens() {
  const { colors, fontConfig } = useTheme();
  const { data: userData } = useGetUserOutputQuery();

  // TODO: Replace with graphql query for user
  if (!userData?.getUser?.account?.children?.length) {
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
  // if (!userData?.getUser.children?.length) {
  //   return (
  //     <ManageChildrenStack.Navigator>
  //       <ManageChildrenStack.Screen
  //         name="ManageChildren"
  //         component={ManageChildren}
  //         options={{ headerShown: false }}
  //       />
  //     </ManageChildrenStack.Navigator>
  //   );
  // }

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
      initialRouteName="Camera"
    >
      <MainBottomNav.Screen
        name="Camera"
        component={Camera}
        options={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.primary['400'],
            borderTopColor: 'transparent',
            height: 100,
            paddingTop: 10,
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
      {/*<MainBottomNav.Screen*/}
      {/*  name="Albums"*/}
      {/*  component={AlbumNavs}*/}
      {/*  options={{*/}
      {/*    tabBarIcon: ({ focused, color }) => (*/}
      {/*      <AlbumIcon size={26} focused={focused} color={color} />*/}
      {/*    ),*/}
      {/*    tabBarActiveTintColor: colors.secondary['500'],*/}
      {/*    tabBarInactiveTintColor: colors.primary['500'],*/}
      {/*    tabBarAccessibilityLabel: 'Albums',*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<MainBottomNav.Screen*/}
      {/*  name="Profile"*/}
      {/*  component={ProfileNavs}*/}
      {/*  options={{*/}
      {/*    tabBarIcon: ({ focused, color }) => (*/}
      {/*      <ProfileIcon size={30} focused={focused} color={color} />*/}
      {/*    ),*/}
      {/*    tabBarActiveTintColor: colors.secondary['500'],*/}
      {/*    tabBarInactiveTintColor: colors.primary['500'],*/}
      {/*    tabBarAccessibilityLabel: 'Profile',*/}
      {/*  }}*/}
      {/*/>*/}
    </MainBottomNav.Navigator>
  );
}

function AppNavs() {
  const { isLoggedIn } = useAuth();
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <AppStack.Screen name="MainStack" component={MainBottomNavScreens} />
      ) : (
        <AppStack.Screen name="AuthStack" component={AuthNavs} />
      )}
    </AppStack.Navigator>
  );
}

export { AppNavs };