import { GraphQLResult } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import { Container, Button, Text, useTheme } from 'native-base';
import { useEffect, useState } from 'react';

import {
  Album,
  GetChildrenAlbumsQuery,
  GetChildrenUnsortedPhotosQuery,
} from '../../generated/API';
import { getChildrenUnsortedPhotos } from '../../graphql/queries';
import { AlbumScreenNavigationProp } from '../../types/routes';

interface ChildAlbum {
  id: string;
  name: string;
  albums: Album[];
}

interface Props {
  navigation: AlbumScreenNavigationProp;
}

function PileScreen({ navigation }: Props) {
  const { fontConfig } = useTheme();
  const [pilePhotos, setPilePhotos] = useState<
    GetChildrenUnsortedPhotosQuery['getChildrenUnsortedPhotos'] | undefined
  >();

  useEffect(() => {
    const getUnsorted = async () => {
      const unsortedPhotos = (await API.graphql(
        graphqlOperation(getChildrenUnsortedPhotos)
      )) as { data: GetChildrenUnsortedPhotosQuery };
      setPilePhotos(unsortedPhotos?.data?.getChildrenUnsortedPhotos);
    };
    if (!pilePhotos?.length) {
      getUnsorted();
    }
  }, []);
  return (
    <Container>
      <Text fontFamily="heading" fontWeight={100} fontSize={60}>
        Pile
      </Text>
      <Text fontFamily="body" fontWeight={400} fontSize={60}>
        Pile
      </Text>
      {pilePhotos?.map((photo) => (
        <Text key={photo?._id}>{photo?._id}</Text>
      ))}
    </Container>
  );
}

export default PileScreen;
