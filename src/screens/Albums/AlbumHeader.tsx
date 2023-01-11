import { StatusBar } from 'react-native';
import { Button, Heading, Row, Text } from 'native-base';

interface Props {
  setShowAlbum: (show: boolean) => void;
}

function AlbumHeader({setShowAlbum}: Props) {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Row alignItems="center" justifyContent="space-between" px={3} mb={5}>
        <Heading  fontSize={34}>Albums</Heading>

        <Button
          colorScheme="secondary"
          variant="ghost"
          py={0}
          rounded="full"
          onPress={() => setShowAlbum(true)}
        >
          <Text fontSize={30} color="secondary.400">
            +
          </Text>
        </Button>
      </Row>
    </>
  );
}

export default AlbumHeader;
