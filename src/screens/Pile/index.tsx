import { GraphQLResult } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import { Box, Button, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import commonStyles from '../../common/styles';
import useCompData from '../../context/compData/useCompData';
import * as domains from '../../context/constants';
import { Album, GetChildrenAlbumsQuery, GetChildrenUnsortedPhotosQuery } from '../../generated/API';
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
  const [pilePhotos, setPilePhotos] = useState<GetChildrenUnsortedPhotosQuery['getChildrenUnsortedPhotos'] | undefined>();

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
  console.log('pilePhotos-------->', pilePhotos);
  return (
    <View style={commonStyles.container}>
      <Text>Pile</Text>
      {pilePhotos?.map((photo) => (
        <Text key={photo?._id}>{photo?._id}</Text>
      ))}
    </View>
  );
}

export default PileScreen;
