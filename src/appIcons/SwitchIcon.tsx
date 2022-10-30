import Svg, { Path } from 'react-native-svg';
import { useTheme } from 'native-base';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  color?: string;
  disabled?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const SwitchIcon = ({ color, size = 30, style = {}, disabled }: Props) => {
  const { colors } = useTheme();
  const fillColor =
    color || (disabled ? colors.gray['400'] : colors.secondary['500']);
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      style={[style]}
    >
      <Path
        d="M5.21875 25V23.125H9.28125L8.8125 22.75C7.47917 21.6875 6.51042 20.5312 5.90625 19.2812C5.30208 18.0312 5 16.6354 5 15.0938C5 12.8854 5.65104 10.901 6.95312 9.14062C8.25521 7.38021 9.96875 6.16667 12.0938 5.5V7.4375C10.5312 8.04167 9.27083 9.04688 8.3125 10.4531C7.35417 11.8594 6.875 13.4062 6.875 15.0938C6.875 16.4062 7.11979 17.5469 7.60938 18.5156C8.09896 19.4844 8.76042 20.3229 9.59375 21.0312L10.5312 21.6875V17.8125H12.4062V25H5.21875ZM17.9375 24.5312V22.5625C19.5208 21.9583 20.7812 20.9531 21.7188 19.5469C22.6562 18.1406 23.125 16.5938 23.125 14.9062C23.125 13.9062 22.8802 12.8906 22.3906 11.8594C21.901 10.8281 21.2604 9.91667 20.4688 9.125L19.5625 8.3125V12.1875H17.6875V5H24.875V6.875H20.7812L21.25 7.3125C22.5 8.47917 23.4375 9.72917 24.0625 11.0625C24.6875 12.3958 25 13.6771 25 14.9062C25 17.1146 24.3542 19.1042 23.0625 20.875C21.7708 22.6458 20.0625 23.8646 17.9375 24.5312Z"
        fill={fillColor}
      />
    </Svg>
  );
};

export default SwitchIcon;
