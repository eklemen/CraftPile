import { API, graphqlOperation } from 'aws-amplify';
import { Button, Column, Heading, Row, Slide, Text } from 'native-base';
import { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import {
  ChildUnsortedPhotos,
  GetChildrenUnsortedPhotosQuery,
} from '../../generated/API';
import { getChildrenUnsortedPhotos } from '../../graphql/queries';
import { AlbumScreenNavigationProp } from '../../types/routes';
import ChildPileBlock from './ChildPileBlock';
import useCompData from '../../context/compData/useCompData';
import { PILE, PileCD } from '../../context/constants';
import TrashCan from '../../appIcons/TrashCan';

interface Props {
  navigation: AlbumScreenNavigationProp;
}

function PileScreen({ navigation }: Props) {
  const { compData: pileCompData, setData: setPileData } =
    useCompData<PileCD>(PILE);
  const [pilePhotos, setPilePhotos] = useState<
    GetChildrenUnsortedPhotosQuery['getChildrenUnsortedPhotos'] | undefined
  >();
  const drawerPosition = useSharedValue(-32);
  const animatedDrawer = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: drawerPosition.value }],
    };
  });

  useEffect(() => {
    setPileData({
      multiSelect: true,
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

  useEffect(() => {
    if (pileCompData.multiSelect) {
      // drawerPosition.value = withSpring(0);
      drawerPosition.value = withTiming(-32, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });
    } else {
      // drawerPosition.value = withSpring(90);
      drawerPosition.value = withTiming(70, {
        duration: 250,
        easing: Easing.in(Easing.exp),
      });
    }
  }, [pileCompData.multiSelect]);
  console.log('pileCompData-------->', pileCompData);
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
        renderItem={({ item }) => (
          <ChildPileBlock child={item as ChildUnsortedPhotos} />
        )}
      />

      <Animated.View style={[animatedDrawer, { marginTop: -32 }]}>
        <Row w="100%" h={73} bg="white">
          <Button
            h={16}
            w={16}
            colorScheme="secondary"
            variant="ghost"
            rounded="full"
            disabled={!Object.keys(pileCompData.selectedPhotos).length}
            flex={1}
          >
            <TrashCan
              disabled={!Object.keys(pileCompData.selectedPhotos).length}
            />
          </Button>
        </Row>
      </Animated.View>
    </Column>
  );
}

export default PileScreen;
