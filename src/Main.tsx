import { NavigationContainer } from '@react-navigation/native';
import Amplify, { Auth } from 'aws-amplify';
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';
import * as Linking from 'expo-linking';
import { NativeBaseProvider, Text } from 'native-base';

import config from '../aws-exports';
import { CompDataProvider } from './context/compData/compDataStore';
import { AppNavs } from './navStacks/HomeStack';
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

// const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = (props: Record<string, any>) => {
  const linking = {
    prefixes: [prefix],
  };
  return (
    <CompDataProvider>
      <NativeBaseProvider>
        <NavigationContainer
          linking={linking}
          fallback={<Text>Loading...</Text>}
        >
          <AppNavs />
        </NavigationContainer>
      </NativeBaseProvider>
    </CompDataProvider>
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
