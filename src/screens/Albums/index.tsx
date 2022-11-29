import {
  Box,
  Button,
  Center,
  Column,
  Heading,
  Pressable,
  Row,
  Text,
} from 'native-base';
import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { FlatList, StatusBar } from 'react-native';

import useCompData from '../../context/compData/useCompData';
import { ALBUMS, AlbumsCD } from '../../context/constants';
import { Album, GetChildrenAlbumsQuery } from '../../generated/API';
import { getChildrenAlbums } from '../../graphql/queries';
import { AlbumScreenNavigationProp } from '../../types/routes';
import S3Image from '../../shared/S3Image';
import ImageBox from '../Pile/ImageBox';
import House from '../../appIcons/House';

interface ChildAlbum {
  id: string;
  name: string;
  albums: Album[];
}

interface Props {
  navigation: AlbumScreenNavigationProp;
}

function AlbumScreen({ navigation }: Props) {
  const { loading, data, error } = useQuery<GetChildrenAlbumsQuery>(
    gql(getChildrenAlbums)
  );

  useEffect(() => {
    // const getAlbums = async () => {
    //   const childrenAlbums = (await API.graphql(
    //     graphqlOperation(getChildrenAlbums)
    //   )) as GraphQLResult<GetChildrenAlbumsQuery>;
    //   setAlbumData({
    //     childrenAlbums: childrenAlbums?.data?.getChildrenAlbums,
    //   });
    // };
    // if (!albumCompData?.length) {
    //   getAlbums();
    // }
  }, []);
  return (
    <Column
      safeAreaTop
      mt={30}
      h="100%"
      style={{ borderColor: 'red', borderWidth: 1 }}
    >
      <StatusBar barStyle="dark-content" />
      <Row alignItems="center" justifyContent="space-between" px={3} mb={5}>
        <Heading size="xl">Albums</Heading>

        <Button colorScheme="secondary" variant="ghost" py={0} rounded="full">
          <Text fontSize={30} color="secondary.400">
            +
          </Text>
        </Button>
      </Row>
      <Column>
        {data?.getChildrenAlbums &&
          data?.getChildrenAlbums.map((childAlbum, index: number) => {
            return (
              <Box key={index} pl={3}>
                <Row>
                  <Heading size="lg">{childAlbum.name}</Heading>
                </Row>
                <Row>
                  <FlatList
                    data={childAlbum.albums}
                    horizontal
                    renderItem={({ item: album }) => (
                      <Box key={album._id} mb={8}>
                        <Pressable
                          onPress={() =>
                            navigation.navigate('AlbumPhotos', {
                              albumId: album._id,
                            })
                          }
                        >
                          <Center w="100%" px={1}>
                            {album?.posterImage ? (
                              <S3Image s3Key={album.posterImage} />
                            ) : (
                              <Center
                                borderColor="primary.800:alpha.20"
                                borderWidth={1}
                                w={220}
                                h={220}
                                minH={160}
                              >
                                <House size={100} />
                              </Center>
                            )}
                            <Box w="100%" mt={2}>
                              <Heading size="md" fontFamily="body" mb={1}>
                                {album?.name}
                              </Heading>
                            </Box>
                          </Center>
                        </Pressable>
                      </Box>
                    )}
                  />
                </Row>

                {/*<Box>*/}
                {/*  <Button*/}
                {/*    onPress={() =>*/}
                {/*      navigation.navigate('AlbumPhotos', {*/}
                {/*        childId: childAlbum.id,*/}
                {/*      })*/}
                {/*    }*/}
                {/*  >*/}
                {/*    <Text>All</Text>*/}
                {/*  </Button>*/}
                {/*</Box>*/}
              </Box>
            );
          })}
      </Column>
    </Column>
  );
}

export default AlbumScreen;
