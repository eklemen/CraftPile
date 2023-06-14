import React from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, VStack } from 'native-base';

interface AddChildProps {
  onAddChild: (data: ChildFormData) => void;
  onCancel: () => void;
}

interface ChildFormData {
  name: string;
  album: {
    id: number;
  };
}

const AddChild: React.FC<AddChildProps> = ({ onAddChild, onCancel }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<ChildFormData>();

  const onSubmit = (data: ChildFormData) => {
    console.log('Child Name:', data.name);
    console.log('Album Object:', data.album);
    reset();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add Child</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: 'Name is required' }}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>Name:</Text>
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
            {errors.name && <Text>{errors.name.message}</Text>}
          </>
        )}
      />
      <Controller
        control={control}
        name="album.id"
        rules={{ required: 'Album ID is required' }}
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Text>Album ID:</Text>
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value.toString()}
              keyboardType="numeric"
            />
            {errors.album?.id && <Text>{errors.album.id.message}</Text>}
          </>
        )}
      />
      <Button onPress={handleSubmit(onSubmit)}>Add</Button>
      <Button onPress={onCancel}>Cancel</Button>
    </View>
  );
};

export default AddChild;
