import { Center, Button } from 'native-base';
import { useEffect } from 'react';
import { View, Text } from 'react-native';

import useCompData from '../../context/compData/useCompData';
import * as domains from '../../context/constants';

function ChildSelectSidebar() {
  const { compData: authCompData, setData: setAuthData } = useCompData(
    domains.AUTH
  );
  const { compData: cameraCompData, setData: setCameraCompData } = useCompData(
    domains.CAMERA
  );
  useEffect(() => {
    setCameraCompData({
      sidebarSelectedChild: authCompData?.children?.[0],
    });
  }, []);
  return (
    <Center
      style={{
        position: 'absolute',
        right: 0,
      }}
    >
      {authCompData?.children?.map((child: any) => {
        const isSelected =
          child.id === cameraCompData?.sidebarSelectedChild?.id;
        return (
          <Button
            key={child.id}
            my={1}
            style={{
              width: isSelected ? 50 : 40,
              height: isSelected ? 50 : 40,
              borderRadius: 50,
            }}
            onPress={() => {
              setCameraCompData({
                sidebarSelectedChild: child,
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
