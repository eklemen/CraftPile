import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox, View, Text, Image } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';
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

import { gql, useLazyQuery, useQuery } from '@apollo/client';

import config from '../aws-exports';
import { CompDataProvider } from './context/compData/compDataStore';
import { AppNavs, MainBottomNavScreens } from './navStacks/HomeStack';
import { themeOverrides } from './styles';
import { GetUserQuery } from './generated/API';
import { getUser } from './graphql/queries';
import useCompData from './context/compData/useCompData';
import { AUTH, UserCD } from './context/constants';
// import RCTAsyncStorage from '@react-native-async-storage/async-storage';
//
// Promise.resolve(RCTAsyncStorage.clear()).then(() => {
//   console.log("cleared");
// });
const getIdToken = async () => ({
  Authorization: (await Auth.currentSession()).getIdToken().getJwtToken(),
});
Amplify.configure({
  ...config,
  API: {
    graphql_headers: getIdToken,
  },
  Analytics: {
    disabled: true,
  },
});
const prefix = Linking.createURL('/');

const signUpConfig = {
  // header: 'Sign Upppp',
  signUpFields: [
    {
      label: 'Email',
      key: 'email',
      placeholder: 'abc@domain.com',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      placeholder: '********',
      required: true,
      displayOrder: 2,
      type: 'password',
    },
    {
      label: 'Please enter your phone number',
      key: 'phone_number',
      placeholder: 'mobile number',
      required: false,
      displayOrder: 3,
      type: 'string',
    },
  ],
};

LogBox.ignoreAllLogs();

interface Props {
}

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
  const { refetch } = useQuery<GetUserQuery>(gql(getUser));
  const { setData: setAuthData } = useCompData<UserCD>(AUTH);
  const linking = {
    prefixes: [prefix],
  };
  const theme = extendTheme(themeOverrides);
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        const { data: userData } = await refetch();
        setAuthData({
          user: userData!.getUser,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 500);
    }
  }, [appIsReady]);
  // if (!fontsLoaded) return <></>;
  if (!appIsReady) {
    return null;
  }
  return (
    <NativeBaseProvider theme={theme}>
        <CompDataProvider>
          <NavigationContainer
            linking={linking}
            onReady={onLayoutRootView}
          >
            <MainBottomNavScreens />
          </NavigationContainer>
        </CompDataProvider>
    </NativeBaseProvider>
  );
};

export default withAuthenticator(Main, {
  usernameAttributes: 'email',
  signUpConfig,
  // services: {
  // async handleSignUp(formData) {
  //   const { password, email } = formData;
  //   const accountId = uuidv4();
  //   return Auth.signUp({
  //     username: email,
  //     password,
  //     attributes: {
  //       'custom:accountId': accountId,
  //     },
  //     autoSignIn: {
  //       enabled: true,
  //     }
  //   });
  // },
  // },
});
