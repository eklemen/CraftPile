import { Box, Heading, Center, FormControl, Input, Button, VStack, HStack, Link, Text } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation, AuthUserInput } from '../../generated/graphql';
import { TouchableOpacity, ImageBackground } from 'react-native';
import * as SecureStore from 'expo-secure-store';

interface FormProps {
  email: string;
  password: string;
}



const Login: React.FC = () => {
  const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm<FormProps>();
  const [login, { data, loading, error }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string>('');


  const navigation = useNavigation<any>();

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;


  const onSubmit = async (data: AuthUserInput) => {
    try {
      const res = await login({
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      });
      console.log(res.data?.login.data, 'data Response') // Data response object
      
      const { refreshToken, idToken } = res.data?.login.data // Get tokens from Response
      
      if (idToken && refreshToken) {
        await SecureStore.setItemAsync('idToken', idToken); // Store the tokens in SecureStore       
        await SecureStore.setItemAsync('refreshToken', refreshToken);
        setErrorMessage('') // Clear error message
        navigation.navigate('Home'); // Navigate to the home screen on success
      }
    } catch (error) {
      console.log(error,'rrorrrr');
      if (error && error.message) {
        setErrorMessage(error.message); // Set the specific error message for display
      } else {
        setErrorMessage('An error occurred. Please try again.'); // Fallback error message
      }
    }
  };
  const handleRegister = () => {
    navigation.navigate('Register'); // Replace 'Register' with the name of your registration screen or route
  };
  const isFormValid = !errors.email && !errors.password; // Check if both email and password fields have no errors

  return (
<ImageBackground
      source={require('../../../assets/bg-image.png')}
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <Center flex={1} py="10">
        <Box w="90%">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: 'warmGray.50' }}>
            Welcome to CraftPile!
          </Heading>
          <Heading mt="1" _dark={{ color: 'warmGray.200' }} color="coolGray.600" fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl isInvalid={!!errors.email?.message}>
              <FormControl.Label>Email ID</FormControl.Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input autoCapitalize="none" onChangeText={onChange} onBlur={onBlur} value={value} />
                )}
                rules={{
                  required: { value: true, message: 'Email is required' },
                  pattern: { value: emailPattern, message: 'Invalid email address' },
                }}
              />
              {errors.email && <FormControl.ErrorMessage>{errors.email.message}</FormControl.ErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.password?.message}>
              <FormControl.Label>Password</FormControl.Label>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input onChangeText={onChange} onBlur={onBlur} value={value} secureTextEntry />
                )}
                rules={{
                  required: { value: true, message: 'Password is required' },
                  pattern: {
                    value: passwordPattern,
                    message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number',
                  },
                }}
              />
              <Link _text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }} alignSelf="flex-end" mt="1">
                Forget Password?
              </Link>
              {errors.password && <FormControl.ErrorMessage>{errors.password.message}</FormControl.ErrorMessage>}
            </FormControl>
            {errorMessage ? <Text color="red.500">{errorMessage}</Text> : null}
            <Button mt="2" colorScheme="primary" onPress={handleSubmit(onSubmit)} isDisabled={!isDirty || !isValid}>Login</Button>
            <HStack mt="6" justifyContent="center">
              <TouchableOpacity onPress={handleRegister}>
                <Heading mt="1" _dark={{ color: 'blue.200' }} color="blue.600" fontWeight="medium" size="xs">
                  Don't have an account? Register here!
                </Heading>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </Box>
      </Center>
      </ImageBackground>
  );
};

export default Login;
