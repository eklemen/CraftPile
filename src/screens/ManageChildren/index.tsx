import {
  Box,
  Button,
  Center,
  Column,
  Heading,
  Row,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import {  useForm } from 'react-hook-form';
import EditIcon from '../../appIcons/Edit';
import {
  CreateChildInput,
  useCreateChildMutation,
} from '../../generated/graphql';
// import EditChildSheet from './EditChildSheet';
import AddChild from './AddChild';

interface Props {}



function ManageChildren({}: Props) {

  const { loading: userLoading, data: userData } = {
    loading: false,
    data: { getUser: { children: [] } },
  };
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showEditChild, setShowEditChild] = useState<boolean>(false);
  const [selectedChild, setSelectedChild] = useState<any>(); // TODO: add type
  const [showAddChildForm, setShowAddChildForm] = useState<boolean>(false);
  const children = userData?.getUser?.children;

  const toggleAddChildForm = () => {
    setShowAddChildForm(!showAddChildForm);
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

            <Button
              variant="ghost"
              w="100%"
              colorScheme="secondary"
              alignItems="center"
              justifyContent="flex-start"
              onPress={toggleAddChildForm}
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
          

          {showAddChildForm && (
            <VStack space={3} mt="5">
              <AddChild onSubmitSuccess={toggleAddChildForm}/>
            </VStack>
          )}
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
