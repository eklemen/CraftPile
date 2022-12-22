import { Column, Heading, Row, Button, Icon, Text } from 'native-base';
import { Auth } from 'aws-amplify';

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

function Profile() {

  return (
    <Column safeAreaTop mt={30} h='100%'>
      <Heading px={3} fontSize={34}>
        Profile
      </Heading>
      <Column h="100%" px={1} mt={5} alignItems="flex-start">
        <Button
          size="lg"
          variant="link"
        >
          <Text fontSize={28}>Manage Children</Text>
        </Button>
        <Button
          size="lg"
          variant="link"
          onPress={signOut}
        >
          <Text fontSize={28}>Logout</Text>
        </Button>
      </Column>
    </Column>
  );
}

export default Profile;
