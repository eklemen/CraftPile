import {
  Center,
  Heading,
  Button,
  Box,
  Text,
  Row,
  Column,
} from 'native-base';
import { useState } from 'react';

import { Child, GetUserQuery } from '../../generated/API';
import { gql, useQuery } from '@apollo/client';
import { getUser } from '../../graphql/queries';
import EditIcon from '../../appIcons/Edit';
import EditChildSheet from './EditChildSheet';

interface Props {
  navigation: any;
}

function ManageChildren({ navigation }: Props) {
  const { loading: userLoading, data: userData } = useQuery<GetUserQuery>(gql(getUser));
  const [showEditChild, setShowEditChild] = useState<boolean>(false);
  const [selectedChild, setSelectedChild] = useState<Child>();
  const children = userData?.getUser?.children;
  return (
    <Box flex={1} safeAreaTop>
      <Heading textAlign='center' mb={6}>Manage children</Heading>
      <Row>
        <Column w='100%'>
          {
            children
              ? children.map((child) => (
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
          {
            !userLoading
              ? (
                <Button
                  variant='ghost'
                  w='100%'
                  colorScheme="secondary"
                  alignItems='center'
                  justifyContent='flex-start'
                  onPress={() => {
                    setShowEditChild(true);
                  }}
                >
                  <Row alignItems='center' w='100%'>
                    <Box>
                      <Heading ml={2}>
                        Add Child
                      </Heading>
                    </Box>
                    <Box ml='auto' mr={7}>
                      <Heading size="2xl" color="secondary.400">+</Heading>
                    </Box>
                  </Row>
                </Button>
              )
              : null
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
