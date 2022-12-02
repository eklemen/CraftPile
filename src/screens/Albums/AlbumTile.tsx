import { Box, Center, Heading, Pressable } from 'native-base';
import S3Image from '../../shared/S3Image';
import House from '../../appIcons/House';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { AlbumScreenNavigationProp } from '../../types/routes';
import { Album } from '../../generated/API';

interface Props {
  album: Album;
  childName?: string;
}
function AlbumTile({ album, childName }: Props) {
  const navigation = useNavigation<AlbumScreenNavigationProp>();
  return (
    <Box key={album._id} mb={8}>
      <Pressable
        onPress={() =>
          navigation.navigate('AlbumPhotos', {
            albumId: album._id,
            childName,
          })
        }
      >
        <Center w="100%" px={0}>
          {album?.posterImage ? (
            <S3Image
              s3Key={album.posterImage}
              h={200}
              w={200}
              style={{
                marginRight: 14,
                marginLeft: 3,
              }}
            />
          ) : (
            <Center
              borderColor="primary.800:alpha.20"
              borderWidth={1}
              w={200}
              h={200}
              minH={160}
              mr={14}
            >
              <House size={100} />
            </Center>
          )}
          <Box w="100%" mt={2}>
            <Heading size="sm" fontFamily="body" mb={1}>
              {album?.name}
            </Heading>
          </Box>
        </Center>
      </Pressable>
    </Box>
  );
}

export default AlbumTile;
