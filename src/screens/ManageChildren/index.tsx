import { API, graphqlOperation } from 'aws-amplify';
import { Formik } from 'formik';
import {
  Center,
  Container,
  Heading,
  Input,
  Button,
  VStack,
  Box,
  FormControl,
  Stack,
  Text,
  HStack,
  Flex,
} from 'native-base';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import useCompData from '../../context/compData/useCompData';
import * as domains from '../../context/constants';
import { AddChildMutation } from '../../generated/API';
import { addChild } from '../../graphql/mutations';
import { ManageChildrenScreenNavigationProp } from '../../types/routes';

interface Props {
  navigation: ManageChildrenScreenNavigationProp;
}

function ManageChildren({ navigation }: Props) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { compData: authCompData, setData: setAuthData } = useCompData(
    domains.AUTH
  );
  // useEffect(() => {
  //   API.graphql(
  //     graphqlOperation(addChild, { input: { name: 'test', age: 1 } })
  //   )
  // }, []);

  const formHandler = async (values: { childName: string; age: any }) => {
    const res = (await API.graphql(
      graphqlOperation(addChild, {
        input: { name: values.childName, age: parseInt(values.age) },
      })
    )) as { data: AddChildMutation };
    setAuthData(res?.data?.addChild);
  };

  return (
    <Center>
      <Container alignItems="center" width="100%">
        <VStack w="100%" h="90%">
          {authCompData?.children?.length ? null : (
            <Heading>First, let's add children to your profile</Heading>
          )}
          {/*<Input shadow={2} size="xl" variant="underlined" placeholder="Child's Name" />*/}
          <HStack my={4} shadow={3}>
            {authCompData?.children?.map((child) => {
              return (
                <Box key={child.id} shadow={2} p={4} rounded="md" bg="white">
                  <Text>Name: {child.name}</Text>
                  <Text>Age: {child.age}</Text>
                </Box>
              );
            })}
          </HStack>
          {showForm ? (
            <Formik
              initialValues={{ childName: '', age: '' }}
              onSubmit={formHandler}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <Box>
                  <FormControl>
                    <Stack m="4">
                      <FormControl.Label>Child's Name</FormControl.Label>
                      <Input
                        onChangeText={handleChange('childName')}
                        onBlur={handleBlur('childName')}
                        value={values.childName}
                        size="xl"
                        variant="underlined"
                        placeholder="Child's Name"
                        mb={4}
                      />
                      <FormControl.Label>Age</FormControl.Label>
                      <Input
                        onChangeText={handleChange('age')}
                        onBlur={handleBlur('age')}
                        value={values.age}
                        size="xl"
                        variant="underlined"
                        placeholder="Child's Name"
                        mb={4}
                      />
                    </Stack>
                  </FormControl>
                  <HStack justifyContent="space-evenly" w="100%">
                    <Button
                      onPress={() => setShowForm(!showForm)}
                      w="40%"
                      colorScheme="muted"
                    >
                      Cancel
                    </Button>
                    <Button
                      onPress={handleSubmit as (values: any) => void}
                      w="40%"
                    >
                      Submit
                    </Button>
                  </HStack>
                </Box>
              )}
            </Formik>
          ) : (
            <Button onPress={() => setShowForm(!showForm)}>Add Child</Button>
          )}
        </VStack>
        <Flex w="90%">
          <Button
            onPress={() => {
              setShowForm(false);
              navigation.navigate('Camera');
            }}
          >
            Done
          </Button>
        </Flex>
      </Container>
    </Center>
  );
}

export default ManageChildren;

const styles = StyleSheet.create({});
