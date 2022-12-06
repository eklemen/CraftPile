import { useEffect, useState } from 'react';
import { Box, Column, Heading, Pressable, Row, Text } from 'native-base';
import { gql, useQuery } from '@apollo/client';
import { GetPhotosForAlbumQuery, Photo } from '../../generated/API';
import { getPhotosForAlbum } from '../../graphql/queries';
import { AlbumPhotosScreenNavigationProp } from '../../types/routes';
import { FlatList } from 'react-native';
import ImageBox from '../Pile/ImageBox';
import PhotoModal from './PhotoModal';

interface Props {
  route: AlbumPhotosScreenNavigationProp;
  navigation: AlbumPhotosScreenNavigationProp;
}

function AlbumPhotos({ route, navigation }: AlbumPhotosScreenNavigationProp) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo>();
  useEffect(() => {
    if (!Boolean(route.params?.albumId)) {
      navigation.navigate('AlbumScreen');
    }
  }, []);
  const { loading, data, error } = useQuery<GetPhotosForAlbumQuery>(
    gql(getPhotosForAlbum),
    {
      variables: {
        input: {
          albumId: route.params?.albumId,
        },
      },
    }
  );
  console.log('data-------->', data);
  return (
    <Column safeAreaTop mt={30} h="100%">
      <Heading size="md" px={3} mb={3}>
        {route.params?.childName || null}
      </Heading>
      {data?.getPhotosForAlbum?.name && (
        <Heading size="xl" px={3} mb={5}>
          {data?.getPhotosForAlbum?.name}
        </Heading>
      )}
      <Box h="100%">
        <Row flexWrap="wrap">
          <FlatList
            data={data?.getPhotosForAlbum?.photos}
            style={{
              flexDirection: 'column',
            }}
            numColumns={2}
            renderItem={({ item }) => (
              <Pressable
                key={item?._id}
                w="50%"
                px={2}
                mb={4}
                style={{ borderColor: 'red', borderWidth: 1 }}
                onPress={() => setSelectedPhoto(item)}
              >
                <ImageBox photoUri={item?.thumbnailKey} />
              </Pressable>
            )}
          />
        </Row>
      </Box>
      <PhotoModal
        selectedPhoto={selectedPhoto!}
        onClose={() => setSelectedPhoto(undefined)}
        showAlbumSelectModal={false}
        setShowAlbumSelectModal={() => {}}
        onAlbumSelect={() => {}}
      />
    </Column>
  );
}

export default AlbumPhotos;
