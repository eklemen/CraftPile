import {
  Box,
  Button,
  Center,
  Column,
  Heading,
  Pressable,
  Row,
  ScrollView,
  Text,
} from 'native-base';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { FlatList } from 'react-native';
import { GetChildrenAlbumsQuery } from '../../generated/API';
import { getChildrenAlbums } from '../../graphql/queries';
import { AlbumScreenNavigationProp } from '../../types/routes';
import S3Image from '../../shared/S3Image';
import House from '../../appIcons/House';
import AlbumHeader from './AlbumHeader';
import ChildAlbumsRow from './ChildAlbumsRow';

interface Props {
  navigation: AlbumScreenNavigationProp;
}

function AlbumScreen({ navigation }: Props) {
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
