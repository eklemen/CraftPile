import { useEffect } from 'react';
import { Box, Text } from 'native-base';

import commonStyles from '../../common/styles';
import useCompData from '../../context/compData/useCompData';
import { GetUserQuery } from '../../generated/API';
import { getUser } from '../../graphql/queries';
import { LandingScreenNavigationProp } from '../../types/routes';
import { UserCD, AUTH } from '../../context/constants';
import { gql, useQuery } from '@apollo/client';

interface Props {
  navigation: LandingScreenNavigationProp;
}

function Landing({ navigation }: Props) {
  const { setData: setAuthData } = useCompData<UserCD>(AUTH);

  const { loading, data: userData } = useQuery<GetUserQuery>(gql(getUser));

  useEffect(() => {
    if (!loading) {
      if (userData?.getUser) {
        setAuthData({
          user: userData.getUser,
        });
      }
      if (userData?.getUser.children?.length) {
        navigation.replace('MainStack', {});
      } else {
        navigation.replace('ManageChildren', {});
      }
    }
  }, [loading]);

  return (
    <Box safeAreaTop>
      <Text fontSize={24}>Loading2...</Text>
    </Box>
  );
}

export default Landing;
