import React from 'react';
import { Box, Center, VStack, Button, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleLogin = () => {
    navigation.navigate('LoginScreen'); 
  };

  const handleRegister = () => {
    navigation.navigate('Register'); 
  };

  return (
    <Center flex={1}>
      <Box>
              <VStack space={3} alignItems="center">
                  <Text>Home Screen. Click on where you want to go</Text>
          <Button colorScheme="primary" onPress={handleLogin}>Login</Button>
          <Button colorScheme="primary" onPress={handleRegister}>Register</Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Home;
