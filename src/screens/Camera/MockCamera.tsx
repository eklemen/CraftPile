import { Button, Box, Text, Heading } from 'native-base';

interface Props {
  askPermissions: () => Promise<void>
}

function MockCamera({ askPermissions }: Props) {

  return (
    <Box safeAreaTop p={5} display="flex" alignItems="center">
      <Heading color="white">Craftpile needs permissions to the camera to work.</Heading>
      <Box w={150} mt={4}>
        <Button variant="outline" colorScheme="primary" onPress={askPermissions}>
          Enable Camera
        </Button>
      </Box>
    </Box>
  );
}

export default MockCamera;
