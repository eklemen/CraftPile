import React from 'react';
import {
  Box,
  Button,
  Column,
  FormControl,
  Heading,
  Input,
  Modal,
  Row,
  Stack,
  Text,
  TextArea,
} from 'native-base';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikProps } from 'formik';

interface Props {
  isOpen: boolean;
}
interface FormInput {
  name: string;
  description?: string;
}

const NewAlbumSchema = Yup.object().shape({
  name: Yup.string().required('Album name is required.'),
  description: Yup.string().required('Album description is required.'),
});

function CreateAlbumModal({ isOpen }: Props) {
  // const {
  //   control,
  //   handleSubmit,
  //   register,
  //   formState: { errors },
  // } = useForm<FormInput>({
  //   defaultValues: {
  //     name: '',
  //     description: '',
  //   },
  //   mode: 'all',
  // });
  const onSubmit = (data: FormInput) => console.log(data);
  return (
    <Modal isOpen={isOpen} onClose={() => {}} size="xl">
      <Formik
        initialValues={{ name: '', description: '' } as FormInput}
        onSubmit={(values) => {
          console.log('values-------->', values);
        }}
        validationSchema={NewAlbumSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }: FormikProps<FormInput>) => (
          <Modal.Content maxWidth="350">
            <Modal.CloseButton />
            <Modal.Body>
              <Row mt={6}>
                <Heading fontSize={26}>Create Album</Heading>
              </Row>
              <Column my={6}>
                <Box>
                  <Stack m="4">
                    <FormControl isRequired>
                      <FormControl.Label>Album's Name</FormControl.Label>
                      <Input
                        size="xl"
                        placeholder="School Year 22-23"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                      />

                      {errors.name && touched.name ? (
                        <Text>{errors.name}</Text>
                      ) : null}
                    </FormControl>
                    <FormControl>
                      <FormControl.Label>
                        Description (optional)
                      </FormControl.Label>
                      {/*<TextArea*/}
                      {/*  size="xl"*/}
                      {/*  placeholder="Crafts and awards from Mrs. Smith's class."*/}
                      {/*  numberOfLines={4}*/}
                      {/*  autoCompleteType="on"*/}
                      {/*  mb={4}*/}
                      {/*/>*/}
                      <TextArea
                        size="xl"
                        placeholder="Crafts and awards from Mrs. Smith's class."
                        numberOfLines={4}
                        autoCompleteType="on"
                        mb={4}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                      />
                    </FormControl>
                  </Stack>
                </Box>
              </Column>
            </Modal.Body>
            <Modal.Footer borderTopWidth={0}>
              <Button
                colorScheme="secondary"
                flex={1}
                h={55}
                onPress={handleSubmit}
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
