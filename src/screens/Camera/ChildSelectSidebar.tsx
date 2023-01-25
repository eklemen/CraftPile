import { Center, Button } from 'native-base';
import { useEffect } from 'react';

import useCompData from '../../context/compData/useCompData';
import * as domains from '../../context/constants';
import { CameraCD, UserCD } from '../../context/constants';
import { Child } from '../../generated/API';

function ChildSelectSidebar() {
  const { compData: authCompData, setData: setAuthData } = useCompData<UserCD>(
    domains.AUTH
  );
  const { compData: cameraCompData, setData: setCameraCompData } = useCompData<CameraCD>(
    domains.CAMERA
  );
  useEffect(() => {
    // TODO: get children from gql
    setCameraCompData({
      selectedChild: authCompData?.user?.children?.[0] as Child,
    });
  }, []);
  return (
    <Center
      style={{
        position: 'absolute',
        right: 0,
      }}
    >
      {authCompData?.user?.children?.map((child: any) => {
        const isSelected =
          child._id === cameraCompData?.selectedChild?._id;
        return (
          <Button
            key={child._id}
            my={1}
            style={{
              width: isSelected ? 50 : 40,
              height: isSelected ? 50 : 40,
              borderRadius: 50,
            }}
            onPress={() => {
              setCameraCompData({
                selectedChild: child,
              });
            }}
          >
            {child?.name.charAt(0)}
          </Button>
        );
      })}
    </Center>
  );
}

export default ChildSelectSidebar;
