// This file is to save plain, known to work versions of the login component




import { Box, Column, Heading, Center, FormControl, Input, Button, VStack, HStack, Link } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation, AuthUserInput, LoginDocument } from "../../generated/graphql";
import { Alert, Text, TouchableOpacity } from 'react-native';
import Register from '../Register/index';

interface FormProps {
  email: string;
  password: string;
}

function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormProps>();
  const [login, {data, loading, error}] = useLoginMutation();
  const navigation = useNavigation();

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const onSubmit = async (data: AuthUserInput) => {

    const res = await login({
      variables: {
        input: {
          email: data.email,
          password: data.password,
        }
      },
    });
    
    
  }
  const handleRegister= () => {
    navigation.navigate("Register"); // Replace 'Signup' with the name of your signup screen or route
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
             <Link _text={{
            fontSize: "xs",
            fontWeight: "500",
            color: "indigo.500"
          }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
        {errors.password && <FormControl.ErrorMessage>{errors.password.message}</FormControl.ErrorMessage>}
      </FormControl>
          <Button mt="2" colorScheme="primary" onPress={handleSubmit(onSubmit)}>Login</Button>
          <HStack mt="6" justifyContent="center">
          <TouchableOpacity onPress={handleRegister}>
          <Heading mt="1" _dark={{ color: "blue.200" }} color="blue.600" fontWeight="medium" size="xs">
            Don't have an account? Register here!
          </Heading>
        </TouchableOpacity>
          </HStack>
        </VStack>
        </Box>
    </Center>
  );
}

export default Login;




// import React from 'react';
// import { Box, Heading, Center, FormControl, Input, Button, VStack, HStack, Link } from 'native-base';
// import { useForm, Controller } from 'react-hook-form';
// import { useNavigation } from '@react-navigation/native';
// import { useLoginMutation, AuthUserInput } from '../../generated/graphql';
// import { Alert, Text, TouchableOpacity, ImageBackground} from 'react-native';
// import Register from '../Register/index';

// interface FormProps {
//   email: string;
//   password: string;
// }

// const Login: React.FC = () => {
//   const { control, handleSubmit, formState: { errors } } = useForm<FormProps>();
//   const [login, { data, loading, error }] = useLoginMutation();
//   const navigation = useNavigation();

//   const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//   const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

//   const onSubmit = async (data: AuthUserInput) => {
//     const res = await login({
//       variables: {
//         input: {
//           email: data.email,
//           password: data.password,
//         },
//       },
//     });
//     console.log('click')
//     console.log(res, 'response data'); // log the data object returned from the mutation
//   };

//   const handleRegister = () => {
//     navigation.navigate('Register'); // Replace 'Register' with the name of your registration screen or route
//   };

//   return (
//     <ImageBackground
//       source={require('../../../assets/bg-image.png')}
//       style={{ flex: 1, justifyContent: 'center' }}
//     >
//     <Center flex={1} py="10">
//       <Box w="90%">
//         <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: 'warmGray.50' }}>
//           Welcome to CraftPile!
//         </Heading>
//         <Heading mt="1" _dark={{ color: 'warmGray.200' }} color="coolGray.600" fontWeight="medium" size="xs">
//           Sign in to continue!
//         </Heading>
//         <VStack space={3} mt="5">
//           <FormControl isInvalid={!!errors.email?.message}>
//             <FormControl.Label>Email ID</FormControl.Label>
//             <Controller
//               control={control}
//               name="email"
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <Input autoCapitalize="none" onChangeText={onChange} onBlur={onBlur} value={value} />
//               )}
//               rules={{
//                 required: { value: true, message: 'Email is required' },
//                 pattern: { value: emailPattern, message: 'Invalid email address' },
//               }}
//             />
//             {errors.email && <FormControl.ErrorMessage>{errors.email.message}</FormControl.ErrorMessage>}
//           </FormControl>
//           <FormControl isInvalid={!!errors.password?.message}>
//             <FormControl.Label>Password</FormControl.Label>
//             <Controller
//               control={control}
//               name="password"
//               render={({ field: { onChange, onBlur, value } }) => (
//                 <Input onChangeText={onChange} onBlur={onBlur} value={value} secureTextEntry />
//               )}
//               rules={{
//                 required: { value: true, message: 'Password is required' },
//                 pattern: { value: passwordPattern, message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number' },
//               }}
//             />
//             <Link _text={{ fontSize: 'xs', fontWeight: '500', color: 'indigo.500' }} alignSelf="flex-end" mt="1">
//               Forget Password?
//             </Link>
//             {errors.password && <FormControl.ErrorMessage>{errors.password.message}</FormControl.ErrorMessage>}
//           </FormControl>
//           <Button mt="2" colorScheme="primary" onPress={handleSubmit(onSubmit)}>Login</Button>
//           <HStack mt="6" justifyContent="center">
//             <TouchableOpacity onPress={handleRegister}>
//               <Heading mt="1" _dark={{ color: 'blue.200' }} color="blue.600" fontWeight="medium" size="xs">
//                 Don't have an account? Register here!
//               </Heading>
//             </TouchableOpacity>
//           </HStack>
//         </VStack>
//       </Box>
//       </Center>
//       </ImageBackground>
//   );
// };

// export default Login;



