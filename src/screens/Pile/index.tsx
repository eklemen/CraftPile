import { API, graphqlOperation } from 'aws-amplify';
import { Button, Column, Heading, Row } from 'native-base';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import {
  ChildUnsortedPhotos,
  DeleteUnsortedPhotosMutation,
  GetChildrenUnsortedPhotosQuery,
} from '../../generated/API';
import { getChildrenUnsortedPhotos } from '../../graphql/queries';
import { AlbumScreenNavigationProp } from '../../types/routes';
import ChildPileBlock from './ChildPileBlock';
import useCompData from '../../context/compData/useCompData';
import { PILE, PileCD } from '../../context/constants';
import PileActionDrawer from './PileActionDrawer';

interface Props {
  navigation: AlbumScreenNavigationProp;
}

function PileScreen({}: Props) {
  const {
    compData: pileCompData,
    setData: setPileData,
    clearComp: resetPileData,
  } = useCompData<PileCD>(PILE);
  const [_, setPilePhotos] = useState<
    | GetChildrenUnsortedPhotosQuery['getChildrenUnsortedPhotos']
    | DeleteUnsortedPhotosMutation['deleteUnsortedPhotos']
    | undefined
  >();

  const {
    loading: listLoading,
    data: { getChildrenUnsortedPhotos: pilePhotos } = {},
    error: listError,
  } = useQuery<GetChildrenUnsortedPhotosQuery>(gql(getChildrenUnsortedPhotos));

  useEffect(() => {
    resetPileData({
      multiSelect: true,
      selectedPhotos: {},
      selectedPhoto: null,
    });
  }, []);

  return (
    <Column safeAreaTop mt={30} h="100%" position="relative">
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
        renderItem={({ item }) => <ChildPileBlock child={item} />}
      />

      <PileActionDrawer setPilePhotos={setPilePhotos} />
    </Column>
  );
}

export default PileScreen;
