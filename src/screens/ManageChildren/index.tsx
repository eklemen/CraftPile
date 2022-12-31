import { API } from 'aws-amplify';

import {
  Center,
  Container,
  Heading,
  Input,
  Button,
} from 'native-base';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

import useCompData from '../../context/compData/useCompData';
import { AUTH } from '../../context/constants';
import { AddChildMutation } from '../../generated/API';
import { addChild } from '../../graphql/mutations';
import { MainStackParamList, ManageChildrenScreenNavigationProp } from '../../types/routes';

interface Props {
  navigation: any;
}

function ManageChildren({ navigation }: Props) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { compData: authCompData, setData: setAuthData } = useCompData(
    AUTH
  );

  const formHandler = async (values: { childName: string; age: any }) => {
    // const res = (await API.graphql(
    //   graphqlOperation(addChild, {
    //     input: { name: values.childName, age: parseInt(values.age) },
    //   })
    // )) as { data: AddChildMutation };
    // setAuthData({ user: res?.data?.addChild });
  };

  return (
    <Center safeAreaTop>
      <Container alignItems="center" width="100%">
        <Heading>Manage children</Heading>
        <Button
          onPress={() => {
            navigation.replace('MainStack');
          }}
        >Go to Cam</Button>
      </Container>
    </Center>
  );
}

export default ManageChildren;

const styles = StyleSheet.create({});
