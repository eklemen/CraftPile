import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';
import * as Linking from 'expo-linking';
import { NativeBaseProvider, extendTheme, Text } from 'native-base';
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
import { AuthOptions, createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

import config from '../aws-exports';
import { CompDataProvider } from './context/compData/compDataStore';
import { AppNavs } from './navStacks/HomeStack';
import { themeOverrides } from './styles';
import { UnsortedId } from './generated/API';
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
////////////////////////////////
const url = config.aws_appsync_graphqlEndpoint;

const region = config.aws_appsync_region;

const auth: AuthOptions = {
  type: config.aws_appsync_authenticationType as 'AMAZON_COGNITO_USER_POOLS',
  jwtToken: async () => {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
  }, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  // credentials: async () => credentials, // Required when you use IAM-based auth.
};

const httpLink = new HttpLink({ uri: url });
const link: ApolloLink = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      UnsortedId: {
        keyFields: ['childId'],
      },
      ChildUnsortedPhotos: {
        keyFields: ['_id', ['childId']],
      },
    },
  }),
});
////////////////////////////////
const Main = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_700Bold,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,
  });
  if (!fontsLoaded) return <></>;
  const linking = {
    prefixes: [prefix],
  };
  const theme = extendTheme(themeOverrides);
  return (
    <ApolloProvider client={client}>
      <NativeBaseProvider theme={theme}>
        <CompDataProvider>
          <NavigationContainer
            linking={linking}
            fallback={<Text>Loading...</Text>}
          >
            <AppNavs />
          </NavigationContainer>
        </CompDataProvider>
      </NativeBaseProvider>
    </ApolloProvider>
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
