import Svg, { Path } from 'react-native-svg';

interface Props {
  color?: string;
  focused?: boolean;
  size?: number;
}

const PileIcon = ({color, size = 32}: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Path d="M3.75 22.5V20.625H26.25V22.5H3.75ZM3.75 15.9375V14.0625H26.25V15.9375H3.75ZM3.75 9.375V7.5H26.25V9.375H3.75Z" fill={color || 'white'}/>
    </Svg>
  )
}

export default PileIcon;
