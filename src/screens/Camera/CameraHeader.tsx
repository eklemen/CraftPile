import { useEffect } from 'react';
import { Container, Row, Center, Box, Button, IconButton } from 'native-base';
import useCompData from '../../context/compData/useCompData';
import * as domains from '../../context/constants';
import { CameraCD, UserCD } from '../../context/constants';
import CameraRoll from '../../appIcons/CameraRoll';

function CameraHeader() {
  const { compData: authCompData } = useCompData<UserCD>(
    domains.AUTH,
  );
  const { compData: cameraCompData, setData: setCameraCompData } = useCompData<CameraCD>(
    domains.CAMERA,
  );
  useEffect(() => {
    setCameraCompData({
      selectedChild: authCompData?.user?.children?.[0],
    });
  }, []);
  return (
    <Center
      bg='primary.800'
      w='100%'
      h={70}
    >
      <Row justifyContent='center'>
        <Box flex={1}>
          <IconButton variant='ghost' icon={<CameraRoll color='white' />} />
        </Box>
        <Row flex={3} alignContent='center' justifyContent='center'>
          {authCompData?.user!.children!.map((child) => {
            const isSelected =
              child!.id === cameraCompData?.selectedChild?.id;
            return (
              <Button
                key={child!.id}
                colorScheme='secondary'
                mx={1}
                my='auto'
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
                {child!.name?.charAt(0)}
              </Button>
            );
          })}
        </Row>
        <Box flex={1} />
      </Row>
    </Center>
  );
}

export default CameraHeader;
