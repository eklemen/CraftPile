import Svg, { Path, G, Rect } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'native-base';

interface Props {
  color?: string;
  disabled?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const AlbumAddIcon = ({ color, size = 30, style = {}, disabled }: Props) => {
  const { colors } = useTheme();
  const fillColor =
    color || (disabled ? colors.gray['400'] : colors.secondary['500']);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      style={style}
    >
      <Path
        d="M6.25 26.25V5.46875C6.25 4.96875 6.4375 4.53125 6.8125 4.15625C7.1875 3.78125 7.625 3.59375 8.125 3.59375H21.875C22.375 3.59375 22.8125 3.78125 23.1875 4.15625C23.5625 4.53125 23.75 4.96875 23.75 5.46875V26.25L15 22.5L6.25 26.25ZM8.125 23.4062L15 20.5L21.875 23.4062V5.46875H8.125V23.4062ZM8.125 5.46875H21.875H15H8.125Z"
        fill={fillColor}
      />
      <Path
        d="M14.625 16.5V13.375H11.5V12.625H14.625V9.5H15.375V12.625H18.5V13.375H15.375V16.5H14.625Z"
        fill={fillColor}
      />
    </Svg>
  );
};

export default AlbumAddIcon;
