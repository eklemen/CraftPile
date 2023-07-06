import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Heading,
  Center,
  FormControl,
  Input,
  Button,
  VStack,
} from 'native-base';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../context/authContext/authContextStore';

import {
  ForgotPasswordInput,
  useForgotPasswordCodeMutation
} from '../../generated/graphql';

interface FormProps {
  email: string;
  password: string;
  passwordConfirmation: string;
}

function ForgotPassword() {
  const { setEmailContext } = useAuth();

const navigation = useNavigation<any>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormProps>();
  const [forgotPasswordCodeMutation, { data, loading, error }] = useForgotPasswordCodeMutation({
    onCompleted(res) {
      if (res.forgotPassword?.success === false) {
        console.log(error)
      }
      if (res.forgotPassword?.success === true) {
        navigation.navigate('ForgotPasswordReset')
      }
      
    },
  });
  const [errorMessage, setErrorMessage] = useState('');
  

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const onSubmit = async (data: ForgotPasswordInput) => {
    const { email } = data;

    setErrorMessage('')
      await forgotPasswordCodeMutation({
        variables: {
          input: {
            email,

          },
        },
      });
      setEmailContext(email)
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
          Enter Your Email to Be Sent Your Password Reset Code
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={!!errors.email}>
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
          
          <Button
            mt="2"
            colorScheme="primary"
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          >
            Send Password Reset Email
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default ForgotPassword;

