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
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';

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
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      name: '',
      description: '',
    },
    mode: 'all',
  });
  const onSubmit = (data: FormInput) => console.log(data);
  return (
    <Modal isOpen={isOpen} onClose={() => {}} size="xl">
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Body>
          <Row mt={6}>
            <Heading fontSize={26}>Create Album</Heading>
          </Row>
          <Column my={6}>
            <Box>
              <Stack m="4">
                <FormControl isRequired isInvalid={'firstName' in errors}>
                  <FormControl.Label>Album's Name</FormControl.Label>
                  {/*<Input size="xl" placeholder="School Year 22-23" mb={4} />*/}
                  <Controller
                    name="name"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value, onBlur } }) => (
                      <Input
                        size="xl"
                        placeholder="School Year 22-23"
                        mb={4}
                        value={value}
                        onChangeText={(value) => onChange(value)}
                        {...register('name')}
                      />
                    )}
                  />
                  <Text>{JSON.stringify(errors)}</Text>
                  <FormControl.ErrorMessage>
                    {errors.name?.message}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl>
                  <FormControl.Label>Description (optional)</FormControl.Label>
                  {/*<TextArea*/}
                  {/*  size="xl"*/}
                  {/*  placeholder="Crafts and awards from Mrs. Smith's class."*/}
                  {/*  numberOfLines={4}*/}
                  {/*  autoCompleteType="on"*/}
                  {/*  mb={4}*/}
                  {/*/>*/}
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextArea
                        size="xl"
                        placeholder="Crafts and awards from Mrs. Smith's class."
                        numberOfLines={4}
                        autoCompleteType="on"
                        mb={4}
                        {...field}
                        value={field.value}
                        onBlur={field.onBlur}
                      />
                    )}
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
            onPress={handleSubmit as (values: any) => void}
            isLoading={false}
          >
            <Text color="white" fontFamily="body" fontSize={22}>
              Save
            </Text>
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default CreateAlbumModal;
