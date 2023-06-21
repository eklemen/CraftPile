import { useForm } from 'react-hook-form';
import { Input, Button, VStack, Text } from 'native-base';
import { useCreateChildMutation, CreateChildMutationVariables } from '../../generated/graphql';

interface ChildData {
  name: string;
  dateOfBirth: string;
  // Other child data fields
}

const AddChild = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<ChildData>();
  const [createChild, { loading, error }] = useCreateChildMutation();

  const onSubmit = async (data: ChildData) => {
    try {
      await createChild({
        variables: {
          input: data,
        },
      });
      console.log(data)
      // Handle success response and update UI accordingly
    } catch (error) {
      // Handle error and update UI accordingly
    }
  };

  return (
    <VStack space={4} alignItems="center">
      {/* Render child data input fields */}
      <Text>Name:</Text>
      <Input
        type="text"
        {...register('name', { required: 'Name is required' })}
        placeholder="Name"
      />
      {errors.name && <Text>{errors.name.message}</Text>}
      <Text>Date of Birth:</Text>
      <Input
        type="text"
        {...register('dateOfBirth')}
        placeholder="Date of Birth"
      />
      {errors.dateOfBirth && <Text>{errors.dateOfBirth.message}</Text>}
      {/* Other child data input fields */}

      <Button onPress={handleSubmit(onSubmit)} disabled={loading}>
        {loading ? 'Creating...' : 'Create Child'}
      </Button>

      {error && <Text>Error: {error.message}</Text>}
    </VStack>
  );
};

export default AddChild;
