import { View, Text, StatusBar } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { GetAlbumsForChildQuery, GetAlbumsForChildQueryVariables } from '../../generated/API';
import { getAlbumsForChild } from '../../graphql/queries';
import { ViewAllAlbumsScreenNavigationProp } from '../../types/routes';
import { Box, Column, FlatList, Heading, Row, Skeleton } from 'native-base';
import AlbumTile from '../Albums/AlbumTile';
import React from 'react';


function ViewAllAlbums({ route }: ViewAllAlbumsScreenNavigationProp) {
  const { loading: loadingAlbums, data: childAlbum, error } = useQuery<GetAlbumsForChildQuery,
    GetAlbumsForChildQueryVariables>(gql(getAlbumsForChild), {
    variables: {
      input: {
        childId: route?.params?.childId!,
      },
    },
  });
  return (
    <Column safeAreaTop mt={30} h="100%">
      <StatusBar barStyle="dark-content" />
      <Row px={2} mb={5}>
        <Skeleton
          width="65%"
          height="22"
          rounded="md"
          isLoaded={Boolean(childAlbum?.getAlbumsForChild?.name)}
        >
          <Heading size="xl">
            {childAlbum?.getAlbumsForChild.name}
          </Heading>
        </Skeleton>
      </Row>
      <Row mb={40} flexWrap='wrap'>
        <FlatList
          data={childAlbum?.getAlbumsForChild?.albums}
          keyExtractor={(item) => item._id}
          style={{
            flexDirection: 'column',
          }}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          numColumns={2}
          renderItem={({ item: album }) => (
              <AlbumTile
                album={album}
                childName={childAlbum?.getAlbumsForChild.name}
                childId={childAlbum?.getAlbumsForChild.id!}
                style={{width: '50%', paddingLeft:14}}
              />
          )}
        />
      </Row>
    </Column>
  );
}

export default ViewAllAlbums;
