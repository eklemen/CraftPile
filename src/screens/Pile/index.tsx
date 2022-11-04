import { Box, Button, Column, Heading, Row } from 'native-base';
import { useEffect } from 'react';
import { Dimensions, FlatList, StatusBar } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import { GetChildrenUnsortedPhotosQuery } from '../../generated/API';
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

  const {
    loading: pilePhotosLoading,
    data: { getChildrenUnsortedPhotos: pilePhotos } = {},
    error: pilePhotosError,
  } = useQuery<GetChildrenUnsortedPhotosQuery>(gql(getChildrenUnsortedPhotos));

  useEffect(() => {
    resetPileData({
      multiSelect: false,
      selectedPhotos: {},
      selectedPhoto: null,
    });
  }, []);

  const isEmptyState = pilePhotos?.length === 0;

  return (
    <Column safeAreaTop mt={30} h="100%" position="relative">
      <StatusBar barStyle="dark-content" />
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
      {isEmptyState && (
        <Row>
          <Heading fontSize={36} textAlign="center" w="100%">
            {`Great job!\nYou have no crafts in your pile.`}
          </Heading>
        </Row>
      )}
      <FlatList
        data={pilePhotos}
        renderItem={({ item }) => (
          <ChildPileBlock
            child={item}
            hideSkeleton={!pilePhotosLoading && !pilePhotosError}
          />
        )}
      />

      <PileActionDrawer />
    </Column>
  );
}

export default PileScreen;
