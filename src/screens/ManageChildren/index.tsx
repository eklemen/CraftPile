
import { Box, Button, Center, Column, Heading, Row, Text, Input, VStack, FormControl, HStack } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import EditIcon from '../../appIcons/Edit';
import { CreateChildInput, useCreateChildMutation } from '../../generated/graphql';
// import EditChildSheet from './EditChildSheet';
import * as SecureStore from 'expo-secure-store';

interface Props {}

interface ChildData {
  name: string;
  dateOfBirth: string;
}




function ManageChildren({ }: Props) {
  const { handleSubmit, control, formState: { errors } } = useForm<ChildData>();
  const { loading: userLoading, data: userData } = {
    loading: false,
    data: { getUser: { children: [] } },
  };
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showEditChild, setShowEditChild] = useState<boolean>(false);
  const [selectedChild, setSelectedChild] = useState<any>(); // TODO: add type
  const [showAddChildForm, setShowAddChildForm] = useState<boolean>(false);
  const children = userData?.getUser?.children;
  


  const [createChildMutation, { data, loading, error }] = useCreateChildMutation({
    async onCompleted(data) {
      if (!data?.createChild) {
        setErrorMessage('Error logging in, check credentials and try again.');
        console.log('error details', data);
      } else {
        setErrorMessage('');
        console.log('success', data);
      }
    },
  });
  


  const onSubmit = async (data: CreateChildInput) => {
    console.log(data, 'data', userData, 'userData')
    await createChildMutation({
      variables: {
        input: {
          dateOfBirth: data.dateOfBirth,
          name: data.name,
        }
      },
    });
  };

  const renderAddChildForm = () => {
    if (!showAddChildForm) {
      return null;
    }

    return (
      <VStack space={3} mt="5">
        <FormControl>
            <FormControl.Label>Name</FormControl.Label>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  autoCapitalize="none"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors?.name && (
              <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
                {errors?.name?.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormControl.Label>Date of Birth</FormControl.Label>
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              
            />
            {errors?.dateOfBirth && (
              <FormControl.ErrorMessage>
                {errors?.dateOfBirth?.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          {errorMessage ? (
            <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
              {errorMessage}
            </FormControl.ErrorMessage>
          ) : null}
          
          <HStack mt="6" justifyContent="center">
          <Button
            mt="2"
            colorScheme="primary"
            onPress={handleSubmit(onSubmit)}
          >
            Add Child
          </Button>
          </HStack>
        </VStack>
    );
  };

  return (
    <Box flex={1} safeAreaTop>
      <Heading textAlign="center" mb={6}>
        Manage children
      </Heading>
      <Row>
        <Column w="100%">
          {children.length
            ? children.map((child: any) => (
                <Button
                  key={child!._id}
                  variant="ghost"
                  w="100%"
                  alignItems="center"
                  justifyContent="flex-start"
                  onPress={() => {
                    setShowEditChild(true);
                    setSelectedChild(child!);
                  }}
                >
                  <Row alignItems="center" w="100%">
                    <Center
                      rounded="full"
                      bg="secondary.100"
                      h={70}
                      w={70}
                      my={4}
                    >
                      {/* <Text fontSize={40}>
                        {child?.name.charAt(0).toUpperCase()}
                      </Text> */}
                    </Center>
                    {/* <Box>
                      <Heading ml={4}>{child?.name}</Heading>
                    </Box> */}
                    <Box ml="auto" mr={7}>
                      <EditIcon />
                    </Box>
                  </Row>
                </Button>
              ))
            : null}
          {!userLoading ? (
            <Button
              variant="ghost"
              w="100%"
              colorScheme="secondary"
              alignItems="center"
              justifyContent="flex-start"
              onPress={() => {
                setShowAddChildForm(true);
              }}
            >
              <Row alignItems="center" w="100%">
                <Box>
                  <Heading ml={2}>Add Child</Heading>
                </Box>
                <Box ml="auto" mr={7}>
                  <Heading size="2xl" color="secondary.400">
                    +
                  </Heading>
                </Box>
              </Row>
            </Button>
          ) : null}
          {renderAddChildForm()}
        </Column>
      </Row>
      {/* <EditChildSheet
        isOpen={showEditChild}
        selectedChild={selectedChild}
        onClose={() => {
          setShowEditChild(false);
          setSelectedChild(undefined);
        }}
      /> */}
    </Box>
  );
}

export default ManageChildren;
