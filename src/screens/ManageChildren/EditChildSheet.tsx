import { useState } from 'react';
import { Actionsheet, Box, Center, FormControl, Input, Text } from 'native-base';
import { Child } from '../../generated/API';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedChild: Child | undefined;
}
function EditChildSheet({ isOpen, onClose, selectedChild }: Props) {
  const [formValues, setFormValues] = useState<Record<string, string>>({
    name: selectedChild?.name || '',
  });
  const handleChange = (name: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }
  return (
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%"px={4} justifyContent="center" alignItems="center">
            <Center rounded='full' bg='secondary.100' h={70} w={70} my={4}>
              <Text fontSize={40}>
                {selectedChild?.name.charAt(0).toUpperCase()}
              </Text>
            </Center>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input placeholder="Johnny" onChange={(e) => handleChange(name, e.target.value)} />
            </FormControl>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
  );
}

export default EditChildSheet;
