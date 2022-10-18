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

function AlbumScreen({ navigation }: Props) {
  const { compData: authCompData } = useCompData(domains.AUTH);
  const { compData: albumCompData, setData: setAlbumData } = useCompData(
    domains.ALBUMS,
  );
  const [unsorted, setUnsorted] = useState<any>();

  useEffect(() => {
    const getUnsorted = async () => {
      try {
        const unsortedPhotos = (await API.graphql(
          graphqlOperation(getChildrenUnsortedPhotos),
        )) as GraphQLResult<GetChildrenUnsortedPhotosQuery>;
        console.log('unsortedPhotos-------->', unsortedPhotos);
        setUnsorted(unsortedPhotos?.data?.getChildrenUnsortedPhotos);
      } catch (err) {
        console.log('err-------->', err);
      }
    };
    console.log('unsorted-------->', unsorted);
    if (!albumCompData?.length) {
      getUnsorted();
    }
  }, []);
  return (
    <View style={commonStyles.container}>
      <Text>Pile</Text>
      {unsorted?.map((photo: any, index: number) => (
        <Text key={index}>{photo._id}</Text>
      ))}
    </View>
  );
}

export default AlbumScreen;
