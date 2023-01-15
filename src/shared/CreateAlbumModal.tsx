import React, { useState } from 'react';
import {
  Box,
  Button, CheckIcon,
  Column,
  FormControl,
  Heading,
  Input,
  Modal,
  Row, Select,
  Stack,
  Text,
  TextArea,
} from 'native-base';
import { gql, useMutation, useQuery } from '@apollo/client';
import { createAlbum } from '../graphql/mutations';
import {
  CreateAlbumMutation,
  CreateAlbumMutationVariables,
  GetUserQuery,
} from '../generated/API';
import { getUser } from '../graphql/queries';
import { FormObject } from '../types/forms';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  childId?: string;
}

interface FormInput {
  name: FormObject;
  description: FormObject;
  selectedChildId: FormObject;
}

const initialFormState: FormInput = {
  name: {
    touched: false,
    value: '',
    error: '',
  },
  description: {
    touched: false,
    value: '',
    error: '',
  },
  selectedChildId: {
    touched: false,
    value: '',
    error: '',
  },
};

function CreateAlbumModal({ isOpen, onClose, childId }: Props) {
  const { data: userData } = useQuery<GetUserQuery>(gql(getUser));
  const [addAlbum] = useMutation<
    CreateAlbumMutation,
    CreateAlbumMutationVariables
  >(gql(createAlbum));
  const [formValues, setFormValues] = useState<FormInput>(initialFormState);
  const onSubmit = async () => {
    const { name, description, selectedChildId } = formValues;
    const { accountId } = userData?.getUser!;
    await addAlbum({
      variables: {
        input: {
          name: name.value,
          description: description.value,
          childId: childId || selectedChildId.value,
          accountId,
        },
      },
    });
    setFormValues(initialFormState);
    onClose();
  };
  const handleChange = (name: keyof FormInput, value: FormObject['value']) => {
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
        error: '',
      },
    });
  };
  const handleBlur = (
    name: keyof FormInput,
    { required }: { required: boolean } = { required: false }
  ) => {
    const error =
      required && !formValues[name].value ? 'This field is required' : '';
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        touched: true,
        error,
      },
    });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
                    onChangeText={(e) => handleChange('name', e)}
                    onBlur={() => handleBlur('name', { required: true })}
                    value={formValues.name.value}
                  />

                  {formValues.name.touched && formValues.name.error ? (
                    <Text color="red.500">{formValues.name.error}</Text>
                  ) : null}
                </FormControl>
                <FormControl>
                  <FormControl.Label>Description (optional)</FormControl.Label>
                  <TextArea
                    size="xl"
                    placeholder="Crafts and awards from Mrs. Smith's class."
                    numberOfLines={4}
                    autoCompleteType="on"
                    mb={4}
                    onChangeText={(e) => handleChange('description', e)}
                    onBlur={() => handleBlur('description')}
                    value={formValues.description.value}
                  />
                </FormControl>

                {
                  userData?.getUser?.children
                  && userData.getUser.children.length > 1
                    ? (
                      <FormControl>
                        <FormControl.Label>Child</FormControl.Label>
                        <Select
                          minWidth="200"
                          accessibilityLabel="Select a child"
                          placeholder="Child"
                          size='xl'
                          selectedValue={
                            formValues.selectedChildId.value || (userData?.getUser?.children[0]?._id ?? '')
                          }
                          onValueChange={itemValue => handleChange('selectedChildId', itemValue)}
                          _selectedItem={{
                            endIcon: <CheckIcon size="5" />,
                          }}
                        >
                          {
                            userData?.getUser?.children &&
                            userData.getUser.children.map((child) => (
                              <Select.Item
                                key={child!._id}
                                label={child!.name}
                                value={child!._id}
                              />
                            ))
                          }
                        </Select>
                      </FormControl>
                    )
                    : null
                }
              </Stack>
            </Box>
          </Column>
        </Modal.Body>
        <Modal.Footer borderTopWidth={0}>
          <Button
            colorScheme="secondary"
            flex={1}
            h={55}
            onPress={onSubmit}
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
