import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from 'native-base';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  color?: string;
  focused?: boolean;
  size?: number;
  styles?: StyleProp<ViewStyle>;
}

const Checkmark = ({ color, size = 32, styles = {} }: Props) => {
  const { colors } = useTheme();
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={styles}>
      <Circle cx="10" cy="10" r="10" fill={colors.secondary['400']} />
      <Path d="M5 10L9 14L16 7" stroke="white" strokeWidth="2" />
    </Svg>
  );
};

export default Checkmark;
