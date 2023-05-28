import { Box, Column, Heading, Center, FormControl, Input, Button, VStack, HStack, Link } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useRegistrationMutation, AuthUserInput, RegistrationDocument } from "../../generated/graphql";
import { Alert, Text, TouchableOpacity } from 'react-native';
interface FormProps {
  email: string;
  password: string;
}

function Register() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormProps>();
  const [register, {data, loading, error}] = useRegistrationMutation();
  const navigation = useNavigation();

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const onSubmit = async (data: AuthUserInput) => {
    try {
      const res = await register({
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      });
      console.log(res, 'response data'); // log the data object returned from the mutation
      
      // Assuming the registration was successful and you have a response field called `success`
      if (res.data?.registerUser?.success) {
        navigation.navigate('VerificationCode'); // Replace 'VerificationCode' with the correct name of the component or route
      } else {
        throw new Error('Registration failed'); // Throw an error if registration was not successful
      }
    } catch (error) {
      console.error('Error during registration:', error); // Log the error to the console for development purposes
      // You can display an error message to the user or handle the error in a different way
    }
  };
  
  const backToLogin= () => {
    navigation.navigate("LoginScreen"); 
  };
  return (
    <Center flex={1} py="10">
      <Box  >
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







