import React, { useState } from 'react';
import { Actionsheet, Box, Center, Heading, Pressable, Row } from 'native-base';
import ImageGridSkeleton from './ImageGridSkeleton';
import ImageBox from '../screens/Pile/ImageBox';
import House from '../appIcons/House';
import {
  AddUnsortedPhotosToAlbumMutation,
  AddUnsortedPhotosToAlbumMutationVariables,
  GetAlbumsForChildQuery, UnsortedPhoto,
} from '../generated/API';
import CreateAlbumModal from './CreateAlbumModal';
import { gql, useMutation } from '@apollo/client';
import { addUnsortedPhotosToAlbum } from '../graphql/mutations';
import useCompData from '../context/compData/useCompData';
import { PILE, PileCD } from '../context/constants';

interface Props {
  loading: boolean;
  data: GetAlbumsForChildQuery | undefined;
  selectedPhotos: Record<string, UnsortedPhoto>;
  resetPileData: (state: Partial<PileCD>) => void;
}

function AlbumGrid({ loading, data, selectedPhotos, resetPileData }: Props) {
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [addPhotosToAlbum] = useMutation<
    AddUnsortedPhotosToAlbumMutation,
    AddUnsortedPhotosToAlbumMutationVariables
    >(gql(addUnsortedPhotosToAlbum));
  const addPhotosToAlbumHandler = async (albumId: string) => {
    const ids = Object.keys(selectedPhotos);
    console.log('ids-------->', ids);
    if (ids.length) {
      await addPhotosToAlbum({
        variables: {
          input: { ids, albumId },
        },
        onCompleted: () => {
          resetPileData({
            multiSelect: false,
            selectedPhotos: {},
            selectedPhoto: null,
            showAlbumSelectSheet: false
          });
        }
      });
    }
  };
  return (
    <Row flexWrap="wrap">
      <ImageGridSkeleton isLoaded={!loading} />
      {data?.getAlbumsForChild?.albums?.map((album) => {
        return (
            <Pressable
              key={album?._id}
              w="50%"
              pr={2}
              mb={4}
              onPress={() => addPhotosToAlbumHandler(album._id)}
            >
              <Center w="100%" px={1}>
                {album?.posterImage ? (
                  <ImageBox photoUri={album.posterImage} />
                ) : (
                  <Center
                    borderColor="primary.800:alpha.20"
                    borderWidth={1}
                    w="100%"
                    minH={160}
                  >
                    <House size={100} />
                  </Center>
                )}
                <Box w="100%" mt={2}>
                  <Heading size="xs" mb={1}>
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
      {!loading && data?.getAlbumsForChild.albums && (
          <Pressable w="50%" pr={2} onPress={() => setShowAlbumForm(true)}>
            <Center w="100%" px={1}>
              <Center
                borderColor="primary.800:alpha.20"
                borderWidth={1}
                w="100%"
                minH={160}
              >
                <Heading size="4xl" color="primary.50">
                  +
                </Heading>
                <Heading size="sm" color="primary.400">
                  New Album
                </Heading>
              </Center>
            </Center>
          </Pressable>
      )}
      <CreateAlbumModal
        isOpen={showAlbumForm}
        onClose={() => setShowAlbumForm(false)}
        childId={data?.getAlbumsForChild._id!}
      />
    </Row>
  );
}

export default AlbumGrid;
