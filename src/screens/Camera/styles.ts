import { StyleSheet } from 'react-native';

export const cameraStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  camera: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    position: 'relative',
    display: 'flex',
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: 'red',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
