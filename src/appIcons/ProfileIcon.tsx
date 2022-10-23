import Svg, { Path } from 'react-native-svg';

interface Props {
  color?: string;
  focused?: boolean;
  size?: number;
}

const PileIcon = ({color, size = 32}: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Path d="M15 14.9688C13.625 14.9688 12.5 14.5312 11.625 13.6562C10.75 12.7813 10.3125 11.6563 10.3125 10.2813C10.3125 8.90625 10.75 7.78125 11.625 6.90625C12.5 6.03125 13.625 5.59375 15 5.59375C16.375 5.59375 17.5 6.03125 18.375 6.90625C19.25 7.78125 19.6875 8.90625 19.6875 10.2813C19.6875 11.6563 19.25 12.7813 18.375 13.6562C17.5 14.5312 16.375 14.9688 15 14.9688ZM5 25V22.0625C5 21.2708 5.19792 20.5937 5.59375 20.0312C5.98958 19.4687 6.5 19.0417 7.125 18.75C8.52083 18.125 9.85938 17.6562 11.1406 17.3438C12.4219 17.0312 13.7083 16.875 15 16.875C16.2917 16.875 17.5729 17.0365 18.8438 17.3594C20.1146 17.6823 21.4479 18.1458 22.8438 18.75C23.4896 19.0417 24.0104 19.4687 24.4062 20.0312C24.8021 20.5937 25 21.2708 25 22.0625V25H5ZM6.875 23.125H23.125V22.0625C23.125 21.7292 23.026 21.4115 22.8281 21.1094C22.6302 20.8073 22.3854 20.5833 22.0938 20.4375C20.7604 19.7917 19.5417 19.349 18.4375 19.1094C17.3333 18.8698 16.1875 18.75 15 18.75C13.8125 18.75 12.6563 18.8698 11.5313 19.1094C10.4063 19.349 9.1875 19.7917 7.875 20.4375C7.58333 20.5833 7.34375 20.8073 7.15625 21.1094C6.96875 21.4115 6.875 21.7292 6.875 22.0625V23.125ZM15 13.0938C15.8125 13.0938 16.4844 12.8281 17.0156 12.2969C17.5469 11.7656 17.8125 11.0938 17.8125 10.2813C17.8125 9.46875 17.5469 8.79688 17.0156 8.26563C16.4844 7.73438 15.8125 7.46875 15 7.46875C14.1875 7.46875 13.5156 7.73438 12.9844 8.26563C12.4531 8.79688 12.1875 9.46875 12.1875 10.2813C12.1875 11.0938 12.4531 11.7656 12.9844 12.2969C13.5156 12.8281 14.1875 13.0938 15 13.0938Z" fill={color || 'white'}/>
    </Svg>

  )
}

export default PileIcon;
