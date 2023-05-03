import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import * as Linking from 'expo-linking';
import { NativeBaseProvider, extendTheme } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import {
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

import { CompDataProvider } from './context/compData/compDataStore';
import { AppNavs, MainBottomNavScreens } from './navStacks/HomeStack';
import { themeOverrides } from './styles';
import { useGetUserOnLoginLazyQuery } from './generated/graphql';
// import RCTAsyncStorage from '@react-native-async-storage/async-storage';
//
// Promise.resolve(RCTAsyncStorage.clear()).then(() => {
//   console.log("cleared");
// });
const prefix = Linking.createURL('/');

LogBox.ignoreAllLogs();

interface Props {}

const Main = ({}: Props) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_700Bold,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,
  });
  const [getUser] = useGetUserOnLoginLazyQuery();
  const linking = {
    prefixes: [prefix],
  };
  const theme = extendTheme(themeOverrides);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const { data: userData } = await getUser();
        // setAuthData({
        //   user: userData!.getUser,
        // });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    setAppIsReady(true);
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 500);
    }
  }, [appIsReady]);
  if (!fontsLoaded) return <></>;
  if (!appIsReady) {
    return null;
  }
  return (
    <NativeBaseProvider theme={theme}>
      <CompDataProvider>
        <NavigationContainer linking={linking} onReady={onLayoutRootView}>
          <AppNavs />
        </NavigationContainer>
      </CompDataProvider>
    </NativeBaseProvider>
  );
};

export default Main;
