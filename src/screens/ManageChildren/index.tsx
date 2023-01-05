import {
  Center,
  Container,
  Heading,
  Input,
  Button, Box, Text, Row, Column, Pressable,
} from 'native-base';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import useCompData from '../../context/compData/useCompData';
import { AUTH } from '../../context/constants';
import { AddChildMutation, Child, GetUserQuery } from '../../generated/API';
import { addChild } from '../../graphql/mutations';
import { MainStackParamList, ManageChildrenScreenNavigationProp } from '../../types/routes';
import { gql, useQuery } from '@apollo/client';
import { getUser } from '../../graphql/queries';
import EditIcon from '../../appIcons/Edit';
import EditChildSheet from './EditChildSheet';

interface Props {
  navigation: any;
}

function ManageChildren({ navigation }: Props) {
  const { loading, data: userData } = useQuery<GetUserQuery>(gql(getUser));
  const [showEditChild, setShowEditChild] = useState<boolean>(false);
  const [selectedChild, setSelectedChild] = useState<Child>();

  const formHandler = async (values: { childName: string; age: any }) => {
    // const res = (await API.graphql(
    //   graphqlOperation(addChild, {
    //     input: { name: values.childName, age: parseInt(values.age) },
    //   })
    // )) as { data: AddChildMutation };
    // setAuthData({ user: res?.data?.addChild });
  };

  return (
    <Box flex={1} safeAreaTop>
      <Heading textAlign='center' mb={6}>Manage children</Heading>
      <Row>
        <Column w='100%'>
          {
            userData?.getUser?.children ? userData?.getUser?.children.map((child) => (
              <Button
                key={child!._id}
                variant='ghost'
                w='100%'
                alignItems='center'
                justifyContent='flex-start'
                onPress={() => {
                  setShowEditChild(true);
                  setSelectedChild(child!);
                }}
              >
                <Row alignItems='center' w='100%'>

                  <Center rounded='full' bg='secondary.100' h={70} w={70} my={4}>
                    <Text fontSize={40}>
                      {child?.name.charAt(0).toUpperCase()}
                    </Text>
                  </Center>
                  <Box>
                    <Heading ml={4}>
                      {child?.name}
                    </Heading>
                  </Box>
                  <Box ml='auto' mr={7}>
                    <EditIcon />
                  </Box>
                </Row>
              </Button>),
            ) : null
          }
        </Column>
      </Row>
      <EditChildSheet
        isOpen={showEditChild}
        selectedChild={selectedChild}
        onClose={() => {
          setShowEditChild(false);
          setSelectedChild(undefined);
        }}
      />
    </Box>
  );
}

export default ManageChildren;
