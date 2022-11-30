import { Column, ScrollView } from 'native-base';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { GetChildrenAlbumsQuery } from '../../generated/API';
import { getChildrenAlbums } from '../../graphql/queries';
import AlbumHeader from './AlbumHeader';
import ChildAlbumsRow from './ChildAlbumsRow';

function AlbumScreen() {
  const { loading, data, error } = useQuery<GetChildrenAlbumsQuery>(
    gql(getChildrenAlbums)
  );

  return (
    <Column safeAreaTop mt={30} h="100%">
      <AlbumHeader />
      <ScrollView mb={8}>
        {data?.getChildrenAlbums &&
          data?.getChildrenAlbums.map((childAlbum, index: number) => {
            return <ChildAlbumsRow key={index} childAlbum={childAlbum} />;
          })}
      </ScrollView>
    </Column>
  );
}

export default AlbumScreen;
