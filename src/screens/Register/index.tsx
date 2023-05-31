import { Box, Column, Heading, Center, FormControl, Input, Button, VStack, HStack, Link, Alert, Text } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRegistrationMutation, AuthUserInput, RegistrationDocument } from "../../generated/graphql";
import { TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

interface FormProps {
  email: string;
  password: string;
  passwordConfirmation: string;
}

function Register() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormProps>();
  const [register, { data, loading, error }] = useRegistrationMutation();
  const [errorMessage, setErrorMessage] = useState('')
  const navigation = useNavigation();

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const onSubmit = async (data: AuthUserInput) => {
    const { email, password, passwordConfirmation } = data;

    // Check if password fields match
    if (password !== passwordConfirmation) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      const res = await register({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      });
    } catch (error) {
      if (error && error.message) {
        setErrorMessage(error.message); // Set the specific error message for display
      } else {
        setErrorMessage('An error occurred. Please try again.'); // Fallback error message
      }
    }
  };

  const backToLogin = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <Center flex={1} py="10">
      <Box>
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
          Welcome to CraftPile!
        </Heading>
        <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          Register to continue!
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
                required: { value: true, message: "Email is required" },
                pattern: { value: emailPattern, message: "Invalid email address" }
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
                required: { value: true, message: "Password is required" },
                pattern: { value: passwordPattern, message: "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number" }
              }}
            />
            {errors.password && <FormControl.ErrorMessage>{errors.password.message}</FormControl.ErrorMessage>}
          </FormControl>
          <FormControl isInvalid={!!errors.passwordConfirmation?.message}>
            <FormControl.Label>Password Confirmation</FormControl.Label>
            <Controller
              control={control}
              name="passwordConfirmation"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input onChangeText={onChange} onBlur={onBlur} value={value} secureTextEntry />
              )}
              rules={{
                required: { value: true, message: "Password confirmation is required" },
                validate: (value) => value === watch("password") || "Passwords do not match",
              }}
            />
            {errors.passwordConfirmation && (
              <FormControl.ErrorMessage>{errors.passwordConfirmation.message}</FormControl.ErrorMessage>
            )}
          </FormControl>
          {errorMessage ? <Text color="red.500">{errorMessage}</Text> : null}
          <Button mt="2" colorScheme="primary" onPress={handleSubmit(onSubmit)}>Register</Button>
          <HStack mt="6" justifyContent="center">
            <TouchableOpacity onPress={backToLogin}>
              <Heading mt="1" _dark={{ color: "blue.200" }} color="blue.600" fontWeight="medium" size="xs">
                Have an account? Back to Login!
              </Heading>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}

export default Register;
