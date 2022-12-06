import { Box, Button, Center, Row, Text } from 'native-base';
import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import TrashCan from '../../../appIcons/TrashCan';
import SwitchIcon from '../../../appIcons/SwitchIcon';
import AlbumAddIcon from '../../../appIcons/AlbumAddIcon';
import {
  DeletePhotosInAlbumMutation,
  DeletePhotosInAlbumMutationVariables,
  Photo,
} from '../../../generated/API';
import { deletePhotosInAlbum } from '../../../graphql/mutations';
import { AlbumScreenNavigationProp } from '../../../types/routes';

interface Props {
  selectedPhoto: Photo;
  onDeleteSuccess: () => void;
  setShowAlbumSelectModal: (isOpen: boolean) => void;
  setShowChildSelectModal: (isOpen: boolean) => void;
  albumId: string;
}

function PileActionBarSingle({
  selectedPhoto,
  onDeleteSuccess,
  setShowAlbumSelectModal,
  setShowChildSelectModal,
  albumId,
}: Props) {
  console.log('route params', albumId);
  const [deletePhotos] = useMutation<
    DeletePhotosInAlbumMutation,
    DeletePhotosInAlbumMutationVariables
  >(gql(deletePhotosInAlbum), {
    onError: (err) => console.log(err),
  });

  const deleteHandler = async () => {
    await deletePhotos({
      variables: {
        input: {
          ids: [selectedPhoto?._id!],
          albumId,
        },
      },
    });
    onDeleteSuccess();
  };
  const openAlbumSelectSheet = () => setShowAlbumSelectModal(true);
  return (
    <Box flex={1}>
      <Row w="100%" h={50} bg="white">
        <Box flex={1}>
          <Button
            h={16}
            w={16}
            colorScheme="secondary"
            variant="ghost"
            rounded="full"
            flex={1}
            onPress={deleteHandler}
          >
            <TrashCan />
          </Button>
        </Box>
        <Center flex={2} flexDirection="row">
          <Button
            w="100%"
            colorScheme="secondary"
            variant="ghost"
            onPress={() => setShowChildSelectModal(true)}
          >
            <Center flexDirection="row">
              <SwitchIcon />
              <Text
                fontSize={14}
                color="secondary.500"
                fontFamily="body"
                fontWeight={700}
                ml={2}
              >
                Change Child
              </Text>
            </Center>
          </Button>
        </Center>
        <Box
          flex={2}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            w="100%"
            colorScheme="secondary"
            variant="ghost"
            onPress={openAlbumSelectSheet}
          >
            <Center flexDirection="row">
              <AlbumAddIcon />
              <Text
                fontSize={14}
                color="secondary.500"
                fontFamily="body"
                fontWeight={700}
                ml={2}
              >
                Add to Album
              </Text>
            </Center>
          </Button>
        </Box>
      </Row>
    </Box>
  );
}

export default PileActionBarSingle;
