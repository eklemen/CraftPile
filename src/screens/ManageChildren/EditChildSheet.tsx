import React, { useEffect, useState } from 'react';
import { Actionsheet, Box, Button, Center, FormControl, Input, Text } from 'native-base';
import { Child } from '../../generated/API';
import { FormObject } from '../../types/forms';

interface FormInput {
  name: FormObject;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedChild: Child | undefined;
}

const initialFormState: FormInput = {
  name: {
    touched: false,
    value: '',
    error: '',
  },
};

function EditChildSheet({ isOpen, onClose, selectedChild }: Props) {
  const [formValues, setFormValues] = useState<FormInput>({
    name: {
      touched: false,
      value: selectedChild?.name || '',
      error: '',
    }
  });
  const handleChange = (name: keyof FormInput, value: FormObject['value']) => {
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
        error: '',
      },
    });
  };
  const handleBlur = (
    name: keyof FormInput,
    { required }: { required: boolean } = { required: false }
  ) => {
    const error =
      required && !formValues[name].value ? 'This field is required' : '';
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        touched: true,
        error,
      },
    });
  };
  useEffect(() => {
    setFormValues({
      name: {
        value: selectedChild?.name || '',
        touched: false,
        error: '',
      }
    });
  }, [selectedChild?._id]);
  return (
      <Actionsheet isOpen={isOpen} onClose={() => {
        console.log('initialFormState----------', initialFormState);
        setFormValues(initialFormState);
        return onClose();
      }}>
        <Actionsheet.Content>
          <Box w="100%"px={4} justifyContent="center" alignItems="center">
            <Center rounded='full' bg='secondary.100' h={70} w={70} my={4}>
              <Text fontSize={40}>
                {selectedChild?.name.charAt(0).toUpperCase()}
              </Text>
            </Center>
            <FormControl mb={10}>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                size="xl"
                placeholder="Johnny"
                onChangeText={(e) => handleChange('name', e)}
                onBlur={() => handleBlur('name', { required: true })}
                value={formValues.name.value}
              />
              {formValues.name.touched && !formValues.name.value ? (
                <Text color="red.500">{formValues.name.error}</Text>
              ) : null}
            </FormControl>
            <Button onPress={() => {
              console.log('Save')
            }}>
              Save
            </Button>
            <Button onPress={() => {
              console.log('Delete');
            }}>
              Delete
            </Button>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
  );
}

export default EditChildSheet;
