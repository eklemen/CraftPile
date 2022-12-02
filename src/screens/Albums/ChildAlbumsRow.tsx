import { Box, Button, Heading, Row, Text, FlatList } from 'native-base';
import React from 'react';
import { ChildAlbums } from '../../generated/API';
import AlbumTile from './AlbumTile';

interface Props {
  childAlbum: ChildAlbums;
}
function ChildAlbumsRow({ childAlbum }: Props) {
  return (
    <Box pl={3}>
      <Row alignItems="center" justifyContent="space-between" mb={4}>
        <Heading size="lg">{childAlbum.name}</Heading>
        <Button
          variant="ghost"
          colorScheme="secondary"
          onPress={() => {
            console.log('See all');
          }}
        >
          <Text
            fontFamily="body"
            fontWeight={700}
            color="secondary.400"
            fontSize={16}
          >
            See all
          </Text>
        </Button>
      </Row>
      <Row>
        <FlatList
          data={childAlbum.albums}
          horizontal
          keyExtractor={(item) => item._id}
          renderItem={({ item: album }) => (
            <AlbumTile album={album} childName={childAlbum.name} />
          )}
        />
      </Row>
    </Box>
  );
}

export default ChildAlbumsRow;
