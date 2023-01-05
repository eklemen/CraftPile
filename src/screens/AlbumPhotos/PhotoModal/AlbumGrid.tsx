import React, { useState } from 'react';
import { Box, Center, Heading, Pressable, Row } from 'native-base';
import ImageGridSkeleton from '../../../shared/ImageGridSkeleton';
import ImageBox from '../../../screens/Pile/ImageBox';
import House from '../../../appIcons/House';
import {
  AssignPhotosToChildInAlbumsMutation,
  AssignPhotosToChildInAlbumsMutationVariables,
  GetAlbumsForChildQuery,
} from '../../../generated/API';
import CreateAlbumModal from '../../../shared/CreateAlbumModal';
import { gql, useMutation } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { assignPhotosToChildInAlbums } from '../../../graphql/mutations';
import { Photo } from '../../../generated/API';
import { getPhotosForAlbum } from '../../../graphql/queries';

interface Props {
  loading: boolean;
  data: GetAlbumsForChildQuery | undefined;
  selectedPhoto: Photo;
  currentAlbumId: string;
  onClose: () => void;
}

function AlbumGrid({ loading, data, selectedPhoto, currentAlbumId, onClose }: Props) {
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [addPhotosToAlbum] = useMutation<AssignPhotosToChildInAlbumsMutation,
    AssignPhotosToChildInAlbumsMutationVariables>(gql(assignPhotosToChildInAlbums));
  const addPhotosToAlbumHandler = async (albumId: string) => {
    if (selectedPhoto) {
      await addPhotosToAlbum({
        variables: {
          input: {
            ids: [selectedPhoto._id!],
            albumId,
            childId: selectedPhoto.childId!,
          },
        },
        refetchQueries: [
          {
            query: gql(getPhotosForAlbum),
            variables: {
              input: {
                albumId: currentAlbumId,
                childId: selectedPhoto.childId,
              },
            },
          },
          {
            query: gql(getPhotosForAlbum),
            variables: {
              input: {
                albumId,
                childId: selectedPhoto.childId,
              },
            },
          },
        ],
        onCompleted: () => {
          onClose();
          setShowAlbumForm(false);
        },
        onError: (err) => console.log('error adding photos to album...', err),
      });
    }
  };
  return (
    <Row flexWrap='wrap'>
      <ImageGridSkeleton isLoaded={!loading} />
      {!loading && data?.getAlbumsForChild.albums && (
        <Pressable w='50%' pr={2} onPress={() => setShowAlbumForm(true)}>
          <Center w='100%' px={1}>
            <Center
              borderColor='primary.800:alpha.20'
              borderWidth={1}
              w='100%'
              minH={160}
            >
              <Heading size='4xl' color='primary.50'>
                +
              </Heading>
              <Heading size='sm' color='primary.400'>
                New Album
              </Heading>
            </Center>
          </Center>
        </Pressable>
      )}
      {data?.getAlbumsForChild?.albums?.filter(a => a._id !== currentAlbumId).map((album) => {
        return (
          <Pressable
            key={album?._id}
            w='50%'
            pr={2}
            mb={4}
            onPress={() => addPhotosToAlbumHandler(album._id)}
          >
            <Center w='100%' px={1}>
              {album?.posterImage ? (
                <ImageBox photoUri={album.posterImage} />
              ) : (
                <Center
                  borderColor='primary.800:alpha.20'
                  borderWidth={1}
                  w='100%'
                  minH={160}
                >
                  <House size={100} />
                </Center>
              )}
              <Box w='100%' mt={2}>
                <Heading size='xs' mb={1}>
                  {album?.name}
                </Heading>
                {/*<Text fontFamily="body" fontSize={14} color="gray.500">*/}
                {/*  3*/}
                {/*</Text>*/}
              </Box>
            </Center>
          </Pressable>
        );
      })}
      <CreateAlbumModal
        isOpen={showAlbumForm}
        onClose={() => setShowAlbumForm(false)}
        childId={data?.getAlbumsForChild._id!}
      />
    </Row>
  );
}

export default AlbumGrid;
