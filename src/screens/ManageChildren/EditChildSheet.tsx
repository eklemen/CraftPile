import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Actionsheet, Box, Button, Center, FormControl, Heading, Input, Text } from 'native-base';
import {
  AddChildMutation, AddChildMutationVariables,
  Child, DeleteChildMutation, DeleteChildMutationVariables,
  GetUserQuery, User,
} from '../../generated/API';
import { FormObject } from '../../types/forms';
import { gql, useMutation, useQuery } from '@apollo/client';
import { addChild, deleteChild } from '../../graphql/mutations';
import { getUser } from '../../graphql/queries';

interface FormInput {
  name: FormObject;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedChild?: Child;
}

const initialFormState: FormInput = {
  name: {
    touched: false,
    value: '',
    error: '',
  },
};

function EditChildSheet({ isOpen, onClose, selectedChild }: Props) {
  const [formValues, setFormValues] = useState<FormInput>({
    name: {
      touched: false,
      value: selectedChild?.name || '',
      error: '',
    },
  });
  const {
    data: userData,
    refetch: refetchUser
  } = useQuery<GetUserQuery>(gql(getUser));
  const [updateChild] = useMutation<AddChildMutation,
    AddChildMutationVariables>(gql(addChild), {
    onError: (err) => console.log(err),
  });
  const [removeChild] = useMutation<DeleteChildMutation,
    DeleteChildMutationVariables>(gql(deleteChild), {
    onError: (err) => console.log(err),
  });
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
    { required }: { required: boolean } = { required: false },
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
  useEffect(() => {
    setFormValues({
      name: {
        value: selectedChild?.name || '',
        touched: false,
        error: '',
      },
    });
  }, [selectedChild?._id]);
  const handleClose = () => {
    setTimeout(() => {
      setFormValues(initialFormState);
    }, 500);
    return onClose();
  };
  const handleEditChild = async () => {
    const input: AddChildMutationVariables['input'] = {
      name: formValues.name.value,
      accountId: userData?.getUser.accountId!,
    };
    // update child
    if (selectedChild) {
      input!._id = selectedChild._id;
      await updateChild({
        variables: {
          input,
        },
      });
    } else {
      // add child
      await updateChild({
        variables: {
          input,
        },
        update: (cache, { data: mutationRes }) => {
          const userObj: GetUserQuery | null = cache.readQuery({ query: gql(getUser) });
          if (userObj && mutationRes?.addChild) {
            cache.writeQuery({
              query: gql(getUser),
              data: {
                getUser: {
                  ...userObj.getUser,
                  children: mutationRes!.addChild,
                },
              },
            });
          } else {
            refetchUser();
          }
        },
      });
    }
    handleClose();
  };
  const handleDelete = async () => {
    if (selectedChild) {
      await removeChild({
        variables: {
          input: {
            _id: selectedChild._id,
          },
        },
        update(cache) {
          const normalizedId = cache.identify({ _id: selectedChild._id, __typename: 'Child' });
          cache.evict({ id: normalizedId });
          cache.gc();
        }
      });
    }
    handleClose();
  };
  const disableSave = (selectedChild?.name === formValues.name.value) || !formValues.name.value;
  return (
    <Actionsheet isOpen={isOpen} onClose={handleClose}>
      <Actionsheet.Content>
        <Box w='100%' px={4} justifyContent='center' alignItems='center'>
          {
            Boolean(selectedChild)
              ? (
                <Center rounded='full' bg='secondary.100' h={70} w={70} my={4}>
                  <Text fontSize={40}>
                    {selectedChild?.name.charAt(0).toUpperCase()}
                  </Text>
                </Center>
              )
              : (
                <Heading>
                  Add Child
                </Heading>
              )
          }
          {
            isOpen
              ? (
                <FormControl mb={10}>
                  <FormControl.Label>Name</FormControl.Label>
                  <Input
                    size='xl'
                    placeholder='Johnny'
                    autoCapitalize="words"
                    autoComplete="off"
                    autoCorrect={false}
                    onChangeText={(e) => handleChange('name', e)}
                    onBlur={() => handleBlur('name', { required: true })}
                    value={formValues.name.value}
                  />
                  {formValues.name.touched && !formValues.name.value ? (
                    <Text color='red.500'>{formValues.name.error}</Text>
                  ) : null}
                </FormControl>
              )
              : null
          }
          <Button
            variant='outline'
            w='100%'
            my={2}
            colorScheme='primary'
            isDisabled={disableSave}
            onPress={handleEditChild}>
            Save
          </Button>
          {
            Boolean(selectedChild)
              ? (
                <Button
                  variant='subtle'
                  w='100%'
                  my={1}
                  colorScheme='secondary'
                  onPress={() => {
                    Alert.alert(
                      'Delete Child?',
                      'This cannot be undone and will delete all photos for this child.',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {
                          text: 'Delete',
                          onPress: () => {
                            handleDelete();
                          }, style: 'destructive',
                        },
                      ],
                    );
                  }}
                >
                  Delete
                </Button>
              )
              : (
                <Button
                  variant='subtle'
                  w='100%'
                  my={1}
                  bg='gray.200'
                  onPress={handleClose}
                >
                  Cancel
                </Button>
              )
          }
        </Box>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default EditChildSheet;
