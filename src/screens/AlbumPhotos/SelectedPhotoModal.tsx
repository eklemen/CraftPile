import { Formik } from 'formik';
import { Button, FormControl, Input, Modal } from 'native-base';
import { View, Text, ImageBackground } from 'react-native';

import { PhotoWithUri } from './index';

interface Props {
  selectedPhoto: PhotoWithUri | null;
  setSelectedPhoto: (photo: PhotoWithUri | null) => void;
}

function SelectedPhotoModal({ selectedPhoto, setSelectedPhoto }: Props) {
  const formHandler = async (values: any) => {
    console.log('values-------->', values);
  };
  return (
    <Modal isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)}>
      <Modal.Content maxWidth="500px">
        <Modal.CloseButton />
        <Modal.Body>
          <ImageBackground
            source={{ uri: selectedPhoto?.fullResUri }}
            resizeMode="cover"
            style={{
              flex: 1,
              justifyContent: 'center',
              height: 300,
            }}
          />
          <Formik
            initialValues={{
              description: selectedPhoto?.description || '',
              albums: selectedPhoto?.albums || [],
            }}
            onSubmit={formHandler}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <FormControl mt="3">
                <FormControl.Label>Description</FormControl.Label>
                <Input
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                  variant="underlined"
                  placeholder="Describe this piece"
                  size="lg"
                  mb={4}
                />
                <Button colorScheme="red">Delete</Button>
              </FormControl>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setSelectedPhoto(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                setSelectedPhoto(null);
              }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default SelectedPhotoModal;
