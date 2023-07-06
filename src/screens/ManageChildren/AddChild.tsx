import { Button, Input, VStack, FormControl, HStack } from 'native-base';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateChildInput, useCreateChildMutation } from '../../generated/graphql';



 interface ChildData {
    name: string;
    dateOfBirth: string;
  }
  interface AddChildProps {
    onSubmitSuccess: () => void;
  }

const AddChild: React.FC<AddChildProps> = ({ onSubmitSuccess }) => {
 
    const { handleSubmit, control, formState: { errors } } = useForm<ChildData>();
  
    const [errorMessage, setErrorMessage] = useState<string>('');

  
  
    const [createChildMutation, { data, loading, error }] = useCreateChildMutation({
      async onCompleted(data) {
        if (!data?.createChild) {
          setErrorMessage('Error logging in, check credentials and try again.');
        } else {
          setErrorMessage('');
        }
      },
    });
    
  
  
    const onSubmit = async (data: CreateChildInput) => {
      await createChildMutation({
        variables: {
          input: {
            dateOfBirth: data.dateOfBirth,
            name: data.name,
          }
        },
      });
    };
    return (
      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                autoCapitalize="none"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors?.name && (
            <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
              {errors?.name?.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <FormControl.Label>Date of Birth</FormControl.Label>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
            
          />
          {errors?.dateOfBirth && (
            <FormControl.ErrorMessage>
              {errors?.dateOfBirth?.message}
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        {errorMessage ? (
          <FormControl.ErrorMessage _text={{ fontSize: 'xs' }}>
            {errorMessage}
          </FormControl.ErrorMessage>
        ) : null}
        
        <HStack mt="6" justifyContent="center">
          <Button
            mt="2"
            colorScheme="primary"
            onPress={handleSubmit(onSubmit)}
          >
            Add Child
          </Button>
        </HStack>
      </VStack>
    );
  };


export default AddChild;
