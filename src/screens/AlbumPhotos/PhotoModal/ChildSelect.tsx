import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  CheckIcon,
  Column,
  Heading,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Text,
} from 'native-base';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import {
  GetChildrenAlbumsQuery,
  GetPhotosForAlbumQuery,
  GetUserQuery,
} from '../../../generated/API';
import {
  getChildrenAlbums,
  getPhotosForAlbum,
  getUser,
} from '../../../graphql/queries';
import {
  AssignPhotosToChildInAlbumsMutation,
  AssignPhotosToChildInAlbumsMutationVariables,
  Photo,
} from '../../../generated/API';
import { assignPhotosToChildInAlbums } from '../../../graphql/mutations';
import { useRoute } from '@react-navigation/native';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedPhoto: Photo;
  currentAlbumId: string;
}

function ChildSelect({
  isOpen,
  onClose,
  selectedPhoto,
}: Props) {
  const [album, setAlbum] = useState('');
  const { data: userData } = useQuery<GetUserQuery>(gql(getUser));
  const route = useRoute<any>();
  const {
    loading,
    data: childAlbums,
    error,
    refetch: refetchChildAlbums,
  } = useQuery<GetChildrenAlbumsQuery>(gql(getChildrenAlbums));
  const [
    assignPhotos,
    { loading: loadingAlbums, error: errorAddingPhotosToAlbum },
  ] = useMutation<
    AssignPhotosToChildInAlbumsMutation,
    AssignPhotosToChildInAlbumsMutationVariables
  >(gql(assignPhotosToChildInAlbums));
  const [refetchPhotos] = useLazyQuery<GetPhotosForAlbumQuery>(
    gql(getPhotosForAlbum),
    {
      variables: {
        input: {
          albumId: album,
          childId: selectedPhoto?.childId,
        },
      },
    }
  );
  const [radioValue, setRadioValue] = useState<string>();
  const [initialChildId, setInitialChildId] = useState<Photo['childId']>();
  useEffect(() => {
    const selectedChild = selectedPhoto?.childId;
    setInitialChildId(selectedChild);
    setRadioValue(selectedChild);
  }, [selectedPhoto]);

  const handleSave = async () => {
    if (initialChildId !== radioValue) {
      await assignPhotos({
        variables: {
          input: {
            ids: selectedPhoto._id ? [selectedPhoto._id] : [],
            childId: radioValue!,
            albumId: album,
          },
        },
        refetchQueries: [
          {
            query: gql(getPhotosForAlbum),
            variables: {
              input: {
                albumId: route.params?.albumId,
                childId: route.params?.childId,
              },
            },
          },
        ],
        onError: (error) => {
          console.log('error-------->', error);
        },
      });
      await refetchPhotos();
      console.log(
        'errorAddingPhotosToAlbum-------->',
        errorAddingPhotosToAlbum
      );
      onClose();
    }
  };
  if (!radioValue) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setRadioValue(undefined);
        onClose();
      }}
    >
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Body>
          <Row mt={6}>
            <Heading fontSize={32}>Change Child</Heading>
          </Row>
          <Column my={6}>
            <Radio.Group
              name="childSelect"
              accessibilityLabel="Select Child"
              value={radioValue}
              onChange={(nextValue) => {
                setRadioValue(nextValue);
              }}
            >
              {userData?.getUser.children?.map((child) => (
                <Radio
                  colorScheme="secondary"
                  value={child?.id as string}
                  my={6}
                  key={child?.id}
                >
                  <Center bg="primary.200" w={50} h={50} rounded="full">
                    <Text fontSize={20} fontFamily="body" color="white">
                      {child!.name?.charAt(0)}
                    </Text>
                  </Center>
                  <Text fontFamily="body" fontWeight="bold" fontSize={18}>
                    {child?.name}
                  </Text>
                </Radio>
              ))}
            </Radio.Group>
            {initialChildId !== radioValue && (
              <Box maxW="300">
                <Select
                  selectedValue={album}
                  minWidth="200"
                  accessibilityLabel="Choose an album"
                  placeholder="Choose an album"
                  _selectedItem={{
                    bg: 'tertiary.100',
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) => setAlbum(itemValue)}
                >
                  {childAlbums?.getChildrenAlbums
                    .find((c) => c?.id === radioValue)
                    ?.albums?.map((album) => (
                      <Select.Item
                        label={album?.name}
                        value={album._id}
                        key={album._id}
                      />
                    ))}
                </Select>
              </Box>
            )}
          </Column>
        </Modal.Body>
        <Modal.Footer borderTopWidth={0}>
          <Button
            colorScheme="secondary"
            flex={1}
            h={70}
            onPress={handleSave}
            isLoading={loadingAlbums}
          >
            <Text color="white" fontFamily="body" fontSize={28}>
              Save
            </Text>
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default ChildSelect;
