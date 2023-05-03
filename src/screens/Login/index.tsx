import { Box, Column, Heading, Center } from 'native-base';

function Login() {
  return (
    // <Column safeAreaTop mt={30} h="100%">
    <Center safeAreaTop mt={30} h="100%">
      <Heading textAlign="center" mb={6}>
        Welcome to CraftPile!
      </Heading>
    </Center>
    // </Column>
  );
}

export default Login;
