import Svg, { Circle } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
}

const Shutter = ({ width = 70, height = 70 }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 70 70" fill="none">
    <Circle cx="35" cy="35" r="30" fill="#ffffff"/>
    <Circle cx="35" cy="35" r="33.5" stroke="#ffffff" strokeWidth="3" />
  </Svg>
)

export default Shutter;
