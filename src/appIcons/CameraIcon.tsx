import Svg, { Path } from 'react-native-svg';

interface Props {
  color?: string;
  focused?: boolean;
  size?: number;
}

const CameraIcon = (props: Props) => {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <Path d="M15 21.6875C16.5 21.6875 17.7604 21.1771 18.7812 20.1562C19.8021 19.1354 20.3125 17.8646 20.3125 16.3438C20.3125 14.8438 19.8021 13.5885 18.7812 12.5781C17.7604 11.5677 16.5 11.0625 15 11.0625C13.4792 11.0625 12.2135 11.5677 11.2031 12.5781C10.1927 13.5885 9.6875 14.8438 9.6875 16.3438C9.6875 17.8646 10.1927 19.1354 11.2031 20.1562C12.2135 21.1771 13.4792 21.6875 15 21.6875ZM15 19.8125C14 19.8125 13.1771 19.4844 12.5312 18.8281C11.8854 18.1719 11.5625 17.3438 11.5625 16.3438C11.5625 15.3646 11.8854 14.5521 12.5312 13.9062C13.1771 13.2604 14 12.9375 15 12.9375C15.9792 12.9375 16.7969 13.2604 17.4531 13.9062C18.1094 14.5521 18.4375 15.3646 18.4375 16.3438C18.4375 17.3438 18.1094 18.1719 17.4531 18.8281C16.7969 19.4844 15.9792 19.8125 15 19.8125ZM4.375 26.25C3.875 26.25 3.4375 26.0625 3.0625 25.6875C2.6875 25.3125 2.5 24.875 2.5 24.375V8.34375C2.5 7.86458 2.6875 7.43229 3.0625 7.04687C3.4375 6.66146 3.875 6.46875 4.375 6.46875H8.96875L11.25 3.75H18.75L21.0312 6.46875H25.625C26.1042 6.46875 26.5365 6.66146 26.9219 7.04687C27.3073 7.43229 27.5 7.86458 27.5 8.34375V24.375C27.5 24.875 27.3073 25.3125 26.9219 25.6875C26.5365 26.0625 26.1042 26.25 25.625 26.25H4.375ZM25.625 24.375V8.34375H20.1562L17.875 5.625H12.125L9.84375 8.34375H4.375V24.375H25.625Z" fill={props.color || 'white'}/>
    </Svg>
  )
}

export default CameraIcon;