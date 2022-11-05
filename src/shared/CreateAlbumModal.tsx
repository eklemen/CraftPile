import React from 'react';
import {
  Box,
  Button,
  Column,
  FormControl,
  Heading,
  HStack,
  Input,
  Modal,
  Row,
  Stack,
  Text,
} from 'native-base';
import { Formik } from 'formik';

interface Props {
  isOpen: boolean;
}

function CreateAlbumModal({ isOpen }: Props) {
  const handleFormSubmit = (values: { name: string; description?: string }) => {
    console.log('values-------->', values);
  };
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <Formik
        initialValues={{ name: '', description: '' }}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <Modal.Content maxWidth="350">
            <Modal.CloseButton />
            <Modal.Body>
              <Row mt={6}>
                <Heading fontSize={26}>Create Album</Heading>
              </Row>
              <Column my={6}>
                <Box>
                  <FormControl>
                    <Stack m="4">
                      <FormControl.Label>Child's Name</FormControl.Label>
                      <Input
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        size="xl"
                        placeholder="Album's Name"
                        mb={4}
                      />
                      <FormControl.Label>Age</FormControl.Label>
                      <Input
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        size="xl"
                        placeholder="Description (optional)"
                        mb={4}
                      />
                    </Stack>
                  </FormControl>
                </Box>
              </Column>
            </Modal.Body>
            <Modal.Footer borderTopWidth={0}>
              <Button
                colorScheme="secondary"
                flex={1}
                h={55}
                onPress={handleSubmit as (values: any) => void}
                isLoading={false}
              >
                <Text color="white" fontFamily="body" fontSize={22}>
                  Save
                </Text>
              </Button>
            </Modal.Footer>
          </Modal.Content>
        )}
      </Formik>
    </Modal>
  );
}

export default CreateAlbumModal;
