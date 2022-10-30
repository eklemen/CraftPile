import { useEffect, useState } from 'react';
import { Box, Button, Center, Row, Text } from 'native-base';
import TrashCan from '../../appIcons/TrashCan';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PILE, PileCD } from '../../context/constants';
import SwitchIcon from '../../appIcons/SwitchIcon';
import AlbumAddIcon from '../../appIcons/AlbumAddIcon';
import useCompData from '../../context/compData/useCompData';
import { API, graphqlOperation } from 'aws-amplify';
import { getChildrenUnsortedPhotos } from '../../graphql/queries';
import {
  DeleteUnsortedPhotosMutation,
  GetChildrenUnsortedPhotosQuery,
} from '../../generated/API';
import { deleteUnsortedPhotos } from '../../graphql/mutations';

interface Props {
  setPilePhotos: React.Dispatch<
    GetChildrenUnsortedPhotosQuery['getChildrenUnsortedPhotos'] | undefined
  >;
}

function PileActionDrawer({ setPilePhotos }: Props) {
  const { compData: pileCompData, clearComp: resetPileData } =
    useCompData<PileCD>(PILE);
  const [disableDrawerBtn, setDisableDrawerBtn] = useState(false);
  const drawerPosition = useSharedValue(70);
  const animatedDrawer = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: drawerPosition.value }],
    };
  });
  useEffect(() => {
    if (pileCompData.multiSelect) {
      drawerPosition.value = withTiming(-32, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });
    } else if (pileCompData.multiSelect === false) {
      drawerPosition.value = withTiming(70, {
        duration: 250,
        easing: Easing.in(Easing.exp),
      });
    }
  }, [pileCompData.multiSelect]);
  const isMultiSelectEmpty =
    pileCompData?.selectedPhotos &&
    !Object.keys(pileCompData.selectedPhotos).length;

  const isMoreThanOneChildIncluded = () => {
    const values =
      pileCompData?.selectedPhotos &&
      Object.values(pileCompData.selectedPhotos);
    const selectedChildIds = values?.map((photo) => photo.childId);
    const uniqueSet = new Set(selectedChildIds).size;
    return uniqueSet !== 1;
  };
  useEffect(() => {
    const shouldDisable = isMoreThanOneChildIncluded();
    if (shouldDisable) {
      setDisableDrawerBtn(true);
    } else {
      setDisableDrawerBtn(false);
    }
  }, [pileCompData.selectedPhotos]);
  const deleteHandler = async () => {
    const ids =
      pileCompData?.selectedPhotos && Object.keys(pileCompData.selectedPhotos);
    if (ids) {
      const updatedUnsortedPhotos = (await API.graphql(
        graphqlOperation(deleteUnsortedPhotos, {
          input: {
            ids: Object.keys(pileCompData.selectedPhotos),
          },
        })
      )) as { data: DeleteUnsortedPhotosMutation };
      setPilePhotos(updatedUnsortedPhotos?.data?.deleteUnsortedPhotos);
      resetPileData({
        multiSelect: true,
        selectedPhotos: {},
        selectedPhoto: null,
      });
    }
  };
  return (
    <Animated.View style={[animatedDrawer, { marginTop: -32 }]}>
      <Row w="100%" h={73} bg="white">
        <Box flex={1}>
          <Button
            h={16}
            w={16}
            colorScheme="secondary"
            variant="ghost"
            rounded="full"
            disabled={isMultiSelectEmpty}
            flex={1}
            onPress={deleteHandler}
          >
            <TrashCan disabled={isMultiSelectEmpty} />
          </Button>
        </Box>
        <Box
          flex={2}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            w="100%"
            colorScheme="secondary"
            variant="ghost"
            onPress={() => {
              console.log('banana');
            }}
            disabled={disableDrawerBtn}
          >
            <Center flexDirection="row">
              <SwitchIcon disabled={disableDrawerBtn} />
              <Text
                fontSize={14}
                color={disableDrawerBtn ? 'gray.400' : 'secondary.500'}
                fontFamily="body"
                fontWeight={700}
                ml={2}
              >
                Change Child
              </Text>
            </Center>
          </Button>
        </Box>
        <Box
          flex={2}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            w="100%"
            colorScheme="secondary"
            variant="ghost"
            onPress={() => {
              console.log('banana');
            }}
            disabled={disableDrawerBtn}
          >
            <Center flexDirection="row">
              <AlbumAddIcon disabled={disableDrawerBtn} />
              <Text
                fontSize={14}
                color={disableDrawerBtn ? 'gray.400' : 'secondary.500'}
                fontFamily="body"
                fontWeight={700}
                ml={2}
              >
                Add to Album
              </Text>
            </Center>
          </Button>
        </Box>
      </Row>
    </Animated.View>
  );
}

export default PileActionDrawer;
