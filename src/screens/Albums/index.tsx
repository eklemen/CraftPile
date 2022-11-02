import { GraphQLResult } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import { Box, Button } from 'native-base';
import { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';

import commonStyles from '../../common/styles';
import useCompData from '../../context/compData/useCompData';
import * as domains from '../../context/constants';
import { Album, GetChildrenAlbumsQuery } from '../../generated/API';
import { getChildrenAlbums, getUser } from '../../graphql/queries';
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
  const { compData: albumCompData, setData: setAlbumData } = useCompData(
    domains.ALBUMS
  );

  useEffect(() => {
    const getAlbums = async () => {
      const childrenAlbums = (await API.graphql(
        graphqlOperation(getChildrenAlbums)
      )) as GraphQLResult<GetChildrenAlbumsQuery>;
      setAlbumData({
        childrenAlbums: childrenAlbums?.data?.getChildrenAlbums,
      });
    };
    if (!albumCompData?.length) {
      getAlbums();
    }
  }, []);
  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="dark-content" />
      {albumCompData?.childrenAlbums &&
        albumCompData.childrenAlbums.map(
          (childAlbum: ChildAlbum, index: number) => {
            return (
              <Box key={index}>
                <Text
                  style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                  }}
                >
                  {childAlbum.name}
                </Text>
                {childAlbum.albums.map((album, index: number) => (
                  <Box key={album._id}>
                    <Button
                      onPress={() =>
                        navigation.navigate('AlbumPhotos', {
                          albumId: album._id,
                        })
                      }
                    >
                      <Text>{album.name}</Text>
                      <Text>{album.description}</Text>
                    </Button>
                  </Box>
                ))}
                <Box>
                  <Button
                    onPress={() =>
                      navigation.navigate('AlbumPhotos', {
                        childId: childAlbum.id,
                      })
                    }
                  >
                    <Text>All</Text>
                  </Button>
                </Box>
              </Box>
            );
          }
        )}
    </View>
  );
}

export default AlbumScreen;
