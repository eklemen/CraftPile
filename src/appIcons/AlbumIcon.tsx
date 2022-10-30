import Svg, { Path, G } from 'react-native-svg';

interface Props {
  color?: string;
  focused?: boolean;
  size?: number;
}

const AlbumIcon = ({ size = 32, color = 'white' }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1200 1200">
      <G>
        <Path
          d="m1101.4 1045.9h-1002.9v-713.58h1002.9zm38.566-752.15h-1080v790.7h1041.4l38.57 0.003906z"
          strokeWidth={40}
          stroke={color}
          fill={color}
        />
        <Path
          d="m156.43 216.65h887.14v38.566h-887.14z"
          fill={color}
          strokeWidth={40}
          stroke={color}
        />
        <Path
          d="m233.57 139.5h732.86v38.566h-732.86z"
          fill={color}
          strokeWidth={40}
          stroke={color}
        />
      </G>
    </Svg>
  );
};

export default AlbumIcon;
