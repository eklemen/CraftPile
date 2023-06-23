import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import {
  Box,
  Heading,
  Center,
  FormControl,
  Input,
  Button,
  VStack,
  HStack,
  Link,
  Text,
} from 'native-base';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useAuth } from '../../context/authContext/authContextStore';
import { useLoginMutation, AuthUserInput, } from '../../generated/graphql';


interface FormProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigation = useNavigation();
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;



  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormProps>();
  const { setLoggedIn } = useAuth();
  
  const [login, { data, loading, error }] = useLoginMutation({
    async onCompleted(data) {
      if (!data?.login) {
        setErrorMessage('Error logging in, check credentials and try again.');
      } else {
        setErrorMessage('');
        const { refreshToken, idToken } = data?.login;
        if (idToken && refreshToken) {
          await Promise.all([
            SecureStore.setItemAsync('idToken', idToken),
            SecureStore.setItemAsync('refreshToken', refreshToken),
          ]);
          setLoggedIn();
          navigation.navigate('MainStack');


        }
      }
    },
  });

  const onSubmit = async (data: AuthUserInput) => {
    
    await login({
      variables: {
        input: {
          email: data.email,
          password: data.password,
        },
      },
 
    });
  };
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <Center flex={1} py="10">
      <Box w="90%">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{ color: 'warmGray.50' }}
        >
          Welcome to CraftPile!
        </Heading>
        <Heading
          mt="1"
          _dark={{ color: 'warmGray.200' }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={!!errors.email?.message}>
            <FormControl.Label>Email ID</FormControl.Label>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              rules={{
                required: { value: true, message: 'Email is required' },
                pattern: {
                  value: emailPattern,
                  message: 'Invalid email address',
                },
              }}
            />
            {errors.email && (
              <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
                {errors.email.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.password?.message}>
            <FormControl.Label>Password</FormControl.Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry
                />
              )}
              rules={{
                required: { value: true, message: 'Password is required' },
              }}
            />
            <Link
              _text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }}
              alignSelf="flex-end"
              mt="1"
            >
              Forgot Password
            </Link>
            {errors.password && (
              <FormControl.ErrorMessage>
                {errors.password.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          {errorMessage ? (
            <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
              {errorMessage}
            </FormControl.ErrorMessage>
          ) : null}
          <Button
            mt="2"
            colorScheme="primary"
            onPress={handleSubmit(onSubmit)}
            // isDisabled={!isDirty || !isValid}
          >
            Login
          </Button>
          <HStack mt="6" justifyContent="center">
            <Button colorScheme="primaryyou " onPress={handleRegister}>
              <Heading
                mt="1"
                _dark={{ color: 'blue.200' }}
                color="blue.600"
                fontWeight="medium"
                size="xs"
              >
                Don't have an account? Register here!
              </Heading>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
