import { ApolloError } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import {
  Box,
  Heading,
  Center,
  FormControl,
  Input,
  Button,
    VStack,
    Text
} from 'native-base';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../context/authContext/authContextStore';

import {
  ConfirmForgotPasswordInput,
  useForgotPasswordResetMutation,
} from '../../generated/graphql';

interface FormProps {
  email: string;
  password: string;
  confirmationCode: string;
}

function ForgotPasswordReset() {
  const {emailContext} = useAuth()
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string | undefined>('');

    const navigation = useNavigation<any>();


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();
  const [forgotPasswordResetMutation, { loading, error }] =
    useForgotPasswordResetMutation({
      onCompleted(res) {
        if (res.confirmForgotPassword?.success === false) {
          setErrorMessage('An error occurred during password reset.');
        } else {
          setSuccessMessage('Password reset successful. Rerouting to Login.');
          setTimeout(() => {
            navigation.navigate('LoginScreen');
          }, 2500); 
        }
      }
      });
 

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const onSubmit = async (data: ConfirmForgotPasswordInput) => {
    const { email, password, confirmationCode } = data;
    if (emailContext === null || emailContext === undefined) {
      console.log("Email is not available");
      return;
    }
    await forgotPasswordResetMutation({
      variables: {
        input: {
          email: emailContext,
          password,
          confirmationCode,
        },
      },
    });
  };
  const getConfirmationCodeErrorMessage = (): string | undefined => {
    if (errors?.confirmationCode) {
      return 'Invalid confirmation code, please try again';
    }
    if (error instanceof ApolloError) {
      return 'Invalid confirmation code, please try again';
    }
    return undefined;
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
         Reset Password
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
          Enter the code that was sent to your email and set your new password.
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={!!errors.password?.message}>
            <FormControl.Label>New Password</FormControl.Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
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
            {errors.password && (
              <FormControl.ErrorMessage>
                {errors.password.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!getConfirmationCodeErrorMessage()}>
            <FormControl.Label>Confirmation Code</FormControl.Label>
            <Controller
              control={control}
              name="confirmationCode"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
                  onChangeText={onChange}
                  onBlur={onBlur}
                      value={value}
                     
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Confirmation code is required',
                },
              }}
            />
           <FormControl.ErrorMessage>
              {getConfirmationCodeErrorMessage()}
            </FormControl.ErrorMessage>
                  </FormControl>
         {errorMessage ? <Text color="red.500">{errorMessage}</Text> : null}
         {successMessage && (
            <Text color="green.500">{successMessage}</Text>
          )}
          <Button
            mt="2"
            colorScheme="primary"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          >
            Reset Password
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default ForgotPasswordReset;


