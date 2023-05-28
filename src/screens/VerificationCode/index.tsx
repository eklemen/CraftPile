import React from 'react';
import { Box, Heading, Center, FormControl, Input, Button, VStack, Alert } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { RootStackParamList } from '../../types/routes';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';



type VerificationCodeScreenRouteProp = RouteProp<RootStackParamList, 'VerificationCode'>;
type VerificationCodeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerificationCode'>;

interface VerificationCodeProps {
  route: VerificationCodeScreenRouteProp;
  navigation: VerificationCodeScreenNavigationProp;
}



interface VerificationCodeProps {
  onSubmit: (data: { code: string }) => void;
}

const VerificationCode: React.FC<VerificationCodeProps> = ({ onSubmit, route, navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<{ code: string }>();

  const handleFormSubmit = (data: { code: string }) => {
    onSubmit(data);
  };

  return (
    <Center flex={1} py="10">
      <Box w="90%">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: 'warmGray.50' }}>
          Email Verification
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isInvalid={!!errors.code?.message}>
            <FormControl.Label>Verification Code</FormControl.Label>
            <Controller
              control={control}
              name="code"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input onChangeText={onChange} onBlur={onBlur} value={value} keyboardType="number-pad" />
              )}
              rules={{ required: { value: true, message: 'Verification code is required' } }}
            />
            {errors.code && <FormControl.ErrorMessage>{errors.code.message}</FormControl.ErrorMessage>}
          </FormControl>
          <Button mt="2" colorScheme="primary" onPress={handleSubmit(handleFormSubmit)}>Submit</Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default VerificationCode;
