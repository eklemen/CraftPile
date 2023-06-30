import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Heading,
  Center,
  FormControl,
  Input,
  Button,
  VStack,
  HStack,
  Text,
} from 'native-base';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../context/authContext/authContextStore';

import {
  useRegistrationMutation,
  AuthUserInput,
} from '../../generated/graphql';

interface FormProps {
  email: string;
  password: string;
  passwordConfirmation: string;
}

function Register() {
  
  const { setEmailContext } = useAuth();


  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormProps>();
  const [register, { loading }] = useRegistrationMutation({
    onCompleted(res) {
      if (res.registerUser?.success) {
        navigation.navigate('VerificationCode');
      } else {
        setErrorMessage('An error occurred.');
      }
    },
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation<any>();

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordPattern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  const onSubmit = async (data: AuthUserInput) => {
    const { email, password } = data;

      await register({
        variables: {
          input: {
            email,
            password,
          },
        },
      });
      setEmailContext(email)
    };


   

  const backToLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <Center flex={1} py="10">
      <Box>
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Welcome to CraftPile!
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Register to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={!!errors.email?.message}>
            <FormControl.Label>Email</FormControl.Label>
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
              <FormControl.ErrorMessage>
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
                pattern: {
                  value: passwordPattern,
                  message:
                    'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character [!@#$%^&*]',
                },
              }}
            />
            {errors.password && (
              <FormControl.ErrorMessage>
                {errors.password.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.passwordConfirmation?.message}>
            <FormControl.Label>Password Confirmation</FormControl.Label>
            <Controller
              control={control}
              name="passwordConfirmation"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  secureTextEntry
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Password confirmation is required',
                },
                validate: (value) =>
                  value === watch('password') || 'Passwords do not match',
              }}
            />
            {errors.passwordConfirmation && (
              <FormControl.ErrorMessage>
                {errors.passwordConfirmation.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          {errorMessage ? <Text color="red.500">{errorMessage}</Text> : null}
          <Button
            mt="2"
            colorScheme="primary"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          >
            Register
          </Button>
          <HStack mt="6" justifyContent="center">
            <Button onPress={backToLogin} colorScheme="secondary">
              <Heading
                mt="1"
                _dark={{ color: 'blue.200' }}
                color="blue.600"
                fontWeight="medium"
                size="xs"
              >
                Have an account? Login!
              </Heading>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}

export default Register;
