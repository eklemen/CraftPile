import { StyleSheet } from 'react-native';

export const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    position: 'relative',
    display: 'flex',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 24,
    position: 'relative',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
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
