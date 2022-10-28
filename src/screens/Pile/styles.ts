import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  imageBox: {
    position: 'relative',
    overflow: 'hidden',
    aspectRatio: 1,
  },
  checkmark: {
    position: 'absolute',
    top: '5%',
    right: '5%',
    zIndex: 2,
  },
});
