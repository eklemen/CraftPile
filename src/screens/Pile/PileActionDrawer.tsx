import { useEffect } from 'react';
import { Box, Button, Row, Text } from 'native-base';
import TrashCan from '../../appIcons/TrashCan';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PileCD } from '../../context/constants';
import SwitchIcon from '../../appIcons/SwitchIcon';

interface Props {
  pileCompData: PileCD;
}

function PileActionDrawer({ pileCompData }: Props) {
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
  return (
    <Animated.View style={[animatedDrawer, { marginTop: -32 }]}>
      <Row w="100%" h={73} bg="white">
        <Box flex={1} style={{ borderColor: 'red', borderWidth: 1 }}>
          <Button
            h={16}
            w={16}
            colorScheme="secondary"
            variant="ghost"
            rounded="full"
            disabled={isMultiSelectEmpty}
            flex={1}
          >
            <TrashCan disabled={isMultiSelectEmpty} />
          </Button>
        </Box>
        <Box
          flex={2}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          style={{ borderColor: 'red', borderWidth: 1 }}
        >
          <Button
            h={16}
            w={16}
            colorScheme="secondary"
            variant="ghost"
            rounded="full"
            disabled={isMultiSelectEmpty}
            flex={1}
          >
            <SwitchIcon />
            <Text>Change Child</Text>
          </Button>
        </Box>
        <Box flex={2} style={{ borderColor: 'red', borderWidth: 1 }}>
          <Button
            h={16}
            w={16}
            colorScheme="secondary"
            variant="ghost"
            rounded="full"
            disabled={isMultiSelectEmpty}
            flex={1}
          >
            <SwitchIcon />
          </Button>
        </Box>
      </Row>
    </Animated.View>
  );
}

export default PileActionDrawer;
