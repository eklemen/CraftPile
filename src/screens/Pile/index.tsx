import { API, graphqlOperation } from 'aws-amplify';
import { Button, Column, Heading, Row, Slide } from 'native-base';
import { useEffect, useState } from 'react';

import {
  ChildUnsortedPhotos,
  GetChildrenUnsortedPhotosQuery,
} from '../../generated/API';
import { getChildrenUnsortedPhotos } from '../../graphql/queries';
import { AlbumScreenNavigationProp } from '../../types/routes';
import ChildPileBlock from './ChildPileBlock';
import { FlatList } from 'react-native';
import useCompData from '../../context/compData/useCompData';
import { PILE, PileCD } from '../../context/constants';

interface Props {
  navigation: AlbumScreenNavigationProp;
}

function PileScreen({ navigation }: Props) {
  const { compData: pileCompData, setData: setPileData } =
    useCompData<PileCD>(PILE);
  const [pilePhotos, setPilePhotos] = useState<
    GetChildrenUnsortedPhotosQuery['getChildrenUnsortedPhotos'] | undefined
  >();

  useEffect(() => {
    setPileData({
      multiSelect: false,
      selectedPhotos: {},
      selectedPhoto: null,
    });
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
  console.log('pileCompData-------->', pileCompData);
  return (
    <Column safeArea mt={30} h="100%">
      <Row alignItems="center" justifyContent="space-between" px={3} mb={5}>
        <Heading fontSize={34}>Pile</Heading>
        <Button
          colorScheme="secondary"
          size="sm"
          rounded="full"
          onPress={() => {
            const payload: Partial<PileCD> = {
              multiSelect: !pileCompData.multiSelect,
            };
            if (pileCompData.multiSelect) {
              payload.selectedPhotos = {};
              setPileData(payload);
            } else {
              setPileData(payload);
            }
          }}
        >
          {pileCompData.multiSelect ? 'Cancel' : 'Select'}
        </Button>
      </Row>
      <FlatList
        data={pilePhotos}
        renderItem={({ item }) => (
          <ChildPileBlock child={item as ChildUnsortedPhotos} />
        )}
      />
      <Row w="100%" h={63} style={{ borderColor: 'red', borderWidth: 1 }}></Row>
    </Column>
  );
}

export default PileScreen;
