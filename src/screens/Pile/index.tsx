import { API, graphqlOperation } from 'aws-amplify';
import {
  Button,
  Text,
  useTheme,
  Column,
  Box,
  Row,
  Heading,
  Image,
  Center,
  ScrollView,
} from 'native-base';
import { useEffect, useState } from 'react';

import {
  ChildUnsortedPhotos,
  GetChildrenUnsortedPhotosQuery,
  UnsortedPhoto,
} from '../../generated/API';
import { getChildrenUnsortedPhotos } from '../../graphql/queries';
import { AlbumScreenNavigationProp } from '../../types/routes';
import Storage from '@aws-amplify/storage';
import S3Image from '../../shared/S3Image';
import ImageBox from './ImageBox';
import ChildPileBlock from './ChildPileBlock';
import { FlatList } from 'react-native';

interface Props {
  navigation: AlbumScreenNavigationProp;
}

function PileScreen({ navigation }: Props) {
  // const { fontConfig } = useTheme();
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
    <Column safeArea mt={30} h="100%">
      <Row alignItems="center" justifyContent="space-between" px={3} mb={5}>
        <Heading fontSize={34}>Pile</Heading>
        <Button colorScheme="secondary" size="sm" rounded="full">
          Select
        </Button>
      </Row>
      <FlatList
        data={pilePhotos}
        renderItem={({ item }) => (
          <ChildPileBlock child={item as ChildUnsortedPhotos} />
        )}
      />
      {/*<ScrollView>*/}
      {/*  {pilePhotos?.map((child) => (*/}
      {/*    <ChildPileBlock*/}
      {/*      key={child?._id?.childId}*/}
      {/*      child={child as ChildUnsortedPhotos}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</ScrollView>*/}
    </Column>
  );
}

export default PileScreen;
