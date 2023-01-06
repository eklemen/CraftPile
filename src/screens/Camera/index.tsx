import { StatusBar } from 'react-native';
import { Center, Box } from 'native-base';

import CameraContainer from './CameraContainer';
import CameraHeader from './CameraHeader';
import { gql, useQuery } from '@apollo/client';
import { GetUserQuery } from '../../generated/API';
import { getUser } from '../../graphql/queries';
import { useEffect } from 'react';
import useCompData from '../../context/compData/useCompData';
import { AUTH, UserCD } from '../../context/constants';

function CameraScreen() {
  const { loading, data: userData } = useQuery<GetUserQuery>(gql(getUser));
  const { setData: setAuthData } = useCompData<UserCD>(AUTH);
  // useEffect(() => {
  //   if (!loading && userData?.getUser) {
  //     setAuthData({
  //       user: userData.getUser,
  //     });
  //   }
  // }, [userData, loading]);
  return (
    <Box safeAreaTop flex={1} bg="primary.800">
      <StatusBar barStyle="light-content" />
      <Center flex={1}>
        <CameraHeader />
        <CameraContainer />
      </Center>
    </Box>
  );
}

export default CameraScreen;
