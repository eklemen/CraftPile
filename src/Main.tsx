import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Amplify, { Auth } from 'aws-amplify';
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native';
import { registerRootComponent } from 'expo';
// @ts-ignore
import { NativeBaseProvider, Box } from 'native-base';

import config from '../aws-exports';
import { SCREENS } from './common/constants';
import { CompDataProvider } from './context/compData/compDataStore';
import AlbumPhotosScreen from './screens/AlbumPhotos';
import AlbumScreen from './screens/Albums';
import CameraScreen from './screens/Camera';
import Landing from './screens/Landing';
import ManageChildren from './screens/ManageChildren';
import { RootStackParamList } from './types/routes';
import { View } from 'react-native';
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

const Stack = createNativeStackNavigator<RootStackParamList>();

const Main = (props: Record<string, any>) => {
  // useEffect(() => {
  //   async function fetchTodos() {
  //     try {
  //       const todoData = await API.graphql(graphqlOperation(listTodos)) as any;
  //       const todos = todoData.data.listTodos.items
  //
  //       setTodos(todos)
  //     } catch (err) { console.log('error fetching todos', err) }
  //   }
  //
  //   fetchTodos();
  // })

  const signOut = async () => {
    await Amplify.Auth.signOut();
    props.onStateChange('signedOut', null);
  };
  return (
    <CompDataProvider>
      <NativeBaseProvider>
        <NavigationContainer>
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
