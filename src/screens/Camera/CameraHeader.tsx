import { Container, Text, Row, Center, Box } from 'native-base';
import useCompData from '../../context/compData/useCompData';
import * as domains from '../../context/constants';

function CameraHeader() {
  const { compData: authCompData } = useCompData(
    domains.AUTH
  );
  return (
    <Container
      bg="primary.800"
      w="100%"
      h={70}
    >
      <Center flex={1}>
        <Row justifyContent="center">
          <Box flex={1}>
            <Text color="white">
              Import
            </Text>
          </Box>
          <Row flex={3} alignContent="center" justifyContent="center">
            {authCompData && authCompData?.user?.children?.map((child) => {
              return (<Text key={child._id} color="white" alignSelf="flex-start">
                {child.name}
              </Text>)
            })}
          </Row>
          <Box flex={1} />
        </Row>
      </Center>
    </Container>
  );
}

export default CameraHeader;
