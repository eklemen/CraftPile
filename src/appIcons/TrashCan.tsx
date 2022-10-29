import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'native-base';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  color?: string;
  disabled?: boolean;
  size?: number;
  styles?: StyleProp<ViewStyle>;
}

const TrashCan = ({ color, size = 30, styles = {}, disabled }: Props) => {
  const { colors } = useTheme();
  const fillColor =
    color || (disabled ? colors.gray['400'] : colors.secondary['500']);
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Path
        d="M8.15625 26.25C7.63542 26.25 7.19271 26.0677 6.82813 25.7031C6.46354 25.3385 6.28125 24.8958 6.28125 24.375V6.5625H5V4.6875H10.875V3.75H19.125V4.6875H25V6.5625H23.7188V24.375C23.7188 24.875 23.5312 25.3125 23.1562 25.6875C22.7812 26.0625 22.3438 26.25 21.8438 26.25H8.15625ZM21.8438 6.5625H8.15625V24.375H21.8438V6.5625ZM11.4688 21.6875H13.3438V9.21875H11.4688V21.6875ZM16.6562 21.6875H18.5312V9.21875H16.6562V21.6875ZM8.15625 6.5625V24.375V6.5625Z"
        fill={fillColor}
        {...styles}
      />
    </Svg>
  );
};

export default TrashCan;
