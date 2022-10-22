import { GraphQLResult } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import commonStyles from '../../common/styles';
import useCompData from '../../context/compData/useCompData';
import * as domains from '../../context/constants';
import { GetUserQuery } from '../../generated/API';
import { getUser } from '../../graphql/queries';
import { LandingScreenNavigationProp } from '../../types/routes';
import { UserCD } from '../../context/constants';

interface Props {
  navigation: LandingScreenNavigationProp;
}

function Landing({ navigation }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const { setData: setAuthData, compData: authCompData } = useCompData<UserCD>(
    domains.AUTH
  );

  useEffect(() => {
    const getUserData = async () => {
      const userData = (await API.graphql(
        graphqlOperation(getUser)
      )) as GraphQLResult<GetUserQuery>;
      if (userData?.data?.getUser) {
        setAuthData({
          user: userData.data.getUser,
        });
      }
      setLoading(false);
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (authCompData?.user?.children?.length) {
        navigation.replace('MainStack', {});
      } else {
        navigation.replace('ManageChildren', {});
      }
    }
  }, [loading]);

  return (
    <View style={commonStyles.container}>
      <Text>Loading...</Text>
    </View>
  );
}

export default Landing;
