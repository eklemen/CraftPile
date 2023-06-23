import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Box,
  Heading,
  Center,
  FormControl,
  Input,
  Button,
  VStack,
} from 'native-base';
import React, { useState,  } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../context/authContext/authContextStore';

import { useVerifyConfirmationCodeMutation } from '../../generated/graphql';

interface VerificationCodeFormValues {
  code: string;
  email: string | null | undefined;
}

const VerificationCode = () => {
 const {emailContext} = useAuth()
  const [validationError, setValidationError] = useState<string>('');
  const { navigate } = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationCodeFormValues>();

  const [verifyConfirmationCode, { loading }] =
    useVerifyConfirmationCodeMutation({
      onCompleted(res) {
        if (res.verifyConfirmationCode?.error) {
          setValidationError('Incorrect confirmation code.');
        } else {
          navigate('LoginScreen');
        }
      },
    });

 
  const onSubmit = async (data: VerificationCodeFormValues) => {
    if (emailContext === null || emailContext === undefined) {
      console.log("Email is not available");
      return;
    }
    await verifyConfirmationCode({
      variables: {
        input: {
          email: emailContext,
          code: data.code,
        },
      },
    });
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
          Email Verification
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={!!errors.code?.message}>
            <FormControl.Label>Verification Code</FormControl.Label>
            <Controller
              control={control}
              name="code"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  keyboardType="number-pad"
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Verification code is required',
                },
              }}
            />
            {errors.code ? (
              <FormControl.ErrorMessage>
                {errors.code.message}
              </FormControl.ErrorMessage>
            ) : null}
            {validationError ? (
              <FormControl.ErrorMessage>
                {validationError}
              </FormControl.ErrorMessage>
            ) : null}
          </FormControl>
          <Button
            mt="2"
            colorScheme="primary"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          >
            Submit
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default VerificationCode;
