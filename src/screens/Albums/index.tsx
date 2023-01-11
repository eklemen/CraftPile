import { Column, ScrollView } from 'native-base';
import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GetChildrenAlbumsQuery } from '../../generated/API';
import { getChildrenAlbums } from '../../graphql/queries';
import AlbumHeader from './AlbumHeader';
import ChildAlbumsRow from './ChildAlbumsRow';
import CreateAlbumModal from '../../shared/CreateAlbumModal';

function AlbumScreen() {
  const [showAddAlbum, setShowAlbum] = useState(false);
  const { loading, data, error } = useQuery<GetChildrenAlbumsQuery>(
    gql(getChildrenAlbums)
  );
  return (
    <Column safeAreaTop mt={30} h="100%">
      <AlbumHeader setShowAlbum={setShowAlbum} />
      <ScrollView mb={8}>
        {data?.getChildrenAlbums &&
          data?.getChildrenAlbums.map((childAlbum, index: number) => {
            return <ChildAlbumsRow key={index} childAlbum={childAlbum} />;
          })}
      </ScrollView>
      <CreateAlbumModal
        isOpen={showAddAlbum}
        onClose={() => setShowAlbum(false)}
      />
    </Column>
  );
}

export default AlbumScreen;
