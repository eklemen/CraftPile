// import { Center, Heading, Button, Box, Text, Row, Column } from 'native-base';
// import { useState } from 'react';

// import EditIcon from '../../appIcons/Edit';
// // import EditChildSheet from './EditChildSheet';

// interface Props {}

// function ManageChildren({}: Props) {
//   const { loading: userLoading, data: userData } = {
//     loading: false,
//     data: { getUser: { children: [] } },
//   };
//   const [showEditChild, setShowEditChild] = useState<boolean>(false);
//   const [selectedChild, setSelectedChild] = useState<any>(); // TODO: add type
//   const children = userData?.getUser?.children;
//   return (
//     <Box flex={1} safeAreaTop>
//       <Heading textAlign="center" mb={6}>
//         Manage children
//       </Heading>
//       <Row>
//         <Column w="100%">
//           {children.length
//             ? children.map((child) => (
//                 <Button
//                   // key={child!._id}
//                   variant="ghost"
//                   w="100%"
//                   alignItems="center"
//                   justifyContent="flex-start"
//                   onPress={() => {
//                     setShowEditChild(true);
//                     setSelectedChild(child!);
//                   }}
//                 >
//                   <Row alignItems="center" w="100%">
//                     <Center
//                       rounded="full"
//                       bg="secondary.100"
//                       h={70}
//                       w={70}
//                       my={4}
//                     >
//                       {/* <Text fontSize={40}>
//                         {child?.name.charAt(0).toUpperCase()}
//                       </Text> */}
//                     </Center>
//                     {/* <Box>
//                       <Heading ml={4}>{child?.name}</Heading>
//                     </Box> */}
//                     <Box ml="auto" mr={7}>
//                       <EditIcon />
//                     </Box>
//                   </Row>
//                 </Button>
//               ))
//             : null}
//           {!userLoading ? (
//             <Button
//               variant="ghost"
//               w="100%"
//               colorScheme="secondary"
//               alignItems="center"
//               justifyContent="flex-start"
//               onPress={() => {
//                 setShowEditChild(true);
//               }}
//             >
//               <Row alignItems="center" w="100%">
//                 <Box>
//                   <Heading ml={2}>Add Child</Heading>
//                 </Box>
//                 <Box ml="auto" mr={7}>
//                   <Heading size="2xl" color="secondary.400">
//                     +
//                   </Heading>
//                 </Box>
//               </Row>
//             </Button>
//           ) : null}
//         </Column>
//       </Row>
//       {/* <EditChildSheet
//         isOpen={showEditChild}
//         selectedChild={selectedChild}
//         onClose={() => {
//           setShowEditChild(false);
//           setSelectedChild(undefined);
//         }}
//       /> */}
//     </Box>
//   );
// }

// export default ManageChildren;


// import { Box, Button, Center, Column, Heading, Row, Text } from 'native-base';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';

// import EditIcon from '../../appIcons/Edit';
// // import EditChildSheet from './EditChildSheet';

// interface Props {}

// interface ChildData {
//   name: string;
// }

// function ManageChildren({}: Props) {
//   const { handleSubmit, control } = useForm<ChildData>();
//   const { loading: userLoading, data: userData } = {
//     loading: false,
//     data: { getUser: { children: [] } },
//   };
//   const [showEditChild, setShowEditChild] = useState<boolean>(false);
//   const [selectedChild, setSelectedChild] = useState<any>(); // TODO: add type
//   const children = userData?.getUser?.children;

//   const onSubmit = (data: ChildData) => {
//     // Handle form submission
//   };

//   return (
//     <Box flex={1} safeAreaTop>
//       <Heading textAlign="center" mb={6}>
//         Manage children
//       </Heading>
//       <Row>
//         <Column w="100%">
//           {children.length
//             ? children.map((child) => (
//                 <Button
//                   // key={child!._id}
//                   variant="ghost"
//                   w="100%"
//                   alignItems="center"
//                   justifyContent="flex-start"
//                   onPress={() => {
//                     setShowEditChild(true);
//                     setSelectedChild(child!);
//                   }}
//                 >
//                   <Row alignItems="center" w="100%">
//                     <Center
//                       rounded="full"
//                       bg="secondary.100"
//                       h={70}
//                       w={70}
//                       my={4}
//                     >
//                       {/* <Text fontSize={40}>
//                         {child?.name.charAt(0).toUpperCase()}
//                       </Text> */}
//                     </Center>
//                     {/* <Box>
//                       <Heading ml={4}>{child?.name}</Heading>
//                     </Box> */}
//                     <Box ml="auto" mr={7}>
//                       <EditIcon />
//                     </Box>
//                   </Row>
//                 </Button>
//               ))
//             : null}
//           {!userLoading ? (
//             <Button
//               variant="ghost"
//               w="100%"
//               colorScheme="secondary"
//               alignItems="center"
//               justifyContent="flex-start"
//               onPress={() => {
//                 setShowEditChild(true);
//               }}
//             >
//               <Row alignItems="center" w="100%">
//                 <Box>
//                   <Heading ml={2}>Add Child</Heading>
//                 </Box>
//                 <Box ml="auto" mr={7}>
//                   <Heading size="2xl" color="secondary.400">
//                     +
//                   </Heading>
//                 </Box>
//               </Row>
//             </Button>
//           ) : null}
//         </Column>
//       </Row>
//       {/* <EditChildSheet
//         isOpen={showEditChild}
//         selectedChild={selectedChild}
//         onClose={() => {
//           setShowEditChild(false);
//           setSelectedChild(undefined);
//         }}
//       /> */}
//     </Box>
//   );
// }

// export default ManageChildren;


// import { Box, Button, Center, Column, Heading, Row, Text, Input } from 'native-base';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';

// import EditIcon from '../../appIcons/Edit';
// import { useCreateChildMutation } from '../../generated/graphql';
// // import EditChildSheet from './EditChildSheet';

// interface Props {}

// interface ChildData {
//   name: string;
//   dateOfBirth: string;
// }

// function ManageChildren({}: Props) {
//   const { handleSubmit, register, control, reset, formState: {errors} } = useForm<ChildData>();
//   const [createChild, { loading, error }] = useCreateChildMutation();
//   const { loading: userLoading, data: userData } = {
//     loading: false,
//     data: { getUser: { children: [] } },
//   };
//   const [showEditChild, setShowEditChild] = useState<boolean>(false);
//   const [selectedChild, setSelectedChild] = useState<any>(); // TODO: add type
//   const [showAddChildForm, setShowAddChildForm] = useState<boolean>(false);
//   const children = userData?.getUser?.children;

//   const onSubmit = (data: ChildData) => {
//     // Handle form submission
//     console.log('Child Name:', data.name);
//     console.log('Child Date of Birth:', data.dateOfBirth);
//     reset();
//   };

//   const renderAddChildForm = () => {
//     if (!showAddChildForm) {
//       return null;
//     }

//     return (
//       <Box p={4}>
//         <Input
//           type="text"
//           placeholder="Name"
//           mb={2}
//           {...register('name', { required: 'Name is required' })}
//         />
//         {errors.name && <Text color="red.500">{errors.name.message}</Text>}
//         <Input
//           type="text"
//           placeholder="Date of Birth"
//           mb={2}
//           {...register('dateOfBirth')}
//         />
//         {errors.dateOfBirth && (
//           <Text color="red.500">{errors.dateOfBirth.message}</Text>
//         )}
//         <Button onPress={handleSubmit(onSubmit)}>Add</Button>
//       </Box>
//     );
//   };

//   return (
//     <Box flex={1} safeAreaTop>
//       <Heading textAlign="center" mb={6}>
//         Manage children
//       </Heading>
//       <Row>
//         <Column w="100%">
//           {children.length
//             ? children.map((child) => (
//                 <Button
//                   // key={child!._id}
//                   variant="ghost"
//                   w="100%"
//                   alignItems="center"
//                   justifyContent="flex-start"
//                   onPress={() => {
//                     setShowEditChild(true);
//                     setSelectedChild(child!);
//                   }}
//                 >
//                   <Row alignItems="center" w="100%">
//                     <Center
//                       rounded="full"
//                       bg="secondary.100"
//                       h={70}
//                       w={70}
//                       my={4}
//                     >
//                       {/* <Text fontSize={40}>
//                         {child?.name.charAt(0).toUpperCase()}
//                       </Text> */}
//                     </Center>
//                     {/* <Box>
//                       <Heading ml={4}>{child?.name}</Heading>
//                     </Box> */}
//                     <Box ml="auto" mr={7}>
//                       <EditIcon />
//                     </Box>
//                   </Row>
//                 </Button>
//               ))
//             : null}
//           {!userLoading ? (
//             <Button
//               variant="ghost"
//               w="100%"
//               colorScheme="secondary"
//               alignItems="center"
//               justifyContent="flex-start"
//               onPress={() => {
//                 setShowAddChildForm(true);
//               }}
//             >
//               <Row alignItems="center" w="100%">
//                 <Box>
//                   <Heading ml={2}>Add Child</Heading>
//                 </Box>
//                 <Box ml="auto" mr={7}>
//                   <Heading size="2xl" color="secondary.400">
//                     +
//                   </Heading>
//                 </Box>
//               </Row>
//             </Button>
//           ) : null}
//           {renderAddChildForm()}
//         </Column>
//       </Row>
//       {/* <EditChildSheet
//         isOpen={showEditChild}
//         selectedChild={selectedChild}
//         onClose={() => {
//           setShowEditChild(false);
//           setSelectedChild(undefined);
//         }}
//       /> */}
//     </Box>
//   );
// }

// export default ManageChildren;

import { Box, Button, Center, Column, Heading, Row, Text, Input, VStack, FormControl, HStack } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as SecureStore from 'expo-secure-store';
import EditIcon from '../../appIcons/Edit';
import { CreateChildInput, useCreateChildMutation } from '../../generated/graphql';
import { useAuth } from '../../context/authContext/authContextStore';
// import EditChildSheet from './EditChildSheet';

interface Props {}

interface ChildData {
  name: string;
  dateOfBirth: string;
}




function ManageChildren({}: Props) {
  const { handleSubmit, control, register, reset, formState: { errors } } = useForm<ChildData>();
  const { loading: userLoading, data: userData } = {
    loading: false,
    data: { getUser: { children: [] } },
  };
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showEditChild, setShowEditChild] = useState<boolean>(false);
  const [selectedChild, setSelectedChild] = useState<any>(); // TODO: add type
  const [showAddChildForm, setShowAddChildForm] = useState<boolean>(false);

  const children = userData?.getUser?.children;

  const { idToken } = useAuth();

  const [createChildMutation, { data, loading, error }] = useCreateChildMutation({
    context: { headers: { authorization: `Bearer ${idToken}` } },
    async onCompleted(data) {
      if (!data?.createChild) {
        setErrorMessage('Error logging in, check credentials and try again.');
        console.log('dataa', data);
      } else {
        setErrorMessage('');
        console.log('errorrr', error);
      }
    },
  });
  


  const onSubmit = async (data: CreateChildInput) => {
    
    await createChildMutation({
      variables: {
        input: {
          name: data.name,
          dateOfBirth: data.dateOfBirth,
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
              rules={{
                required: { value: true, message: 'Name is required' }
              }}
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
              rules={{
                required: { value: true, message: 'Password is required' },
              }}
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
            ? children.map((child) => (
                <Button
                  // key={child!._id}
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
