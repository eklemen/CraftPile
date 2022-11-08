import React, { useState } from 'react';
import { Box, Center, Heading, Pressable, Row } from 'native-base';
import ImageGridSkeleton from './ImageGridSkeleton';
import ImageBox from '../screens/Pile/ImageBox';
import House from '../appIcons/House';
import { GetAlbumsForChildQuery } from '../generated/API';
import CreateAlbumModal from './CreateAlbumModal';

interface Props {
  loading: boolean;
  data: GetAlbumsForChildQuery | undefined;
  onAlbumSelect: (albumId: string) => void;
}

function AlbumGrid({ loading, data, onAlbumSelect }: Props) {
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  return (
    <Row flexWrap="wrap">
      <ImageGridSkeleton isLoaded={!loading} />
      {data?.getAlbumsForChild?.albums?.map((album, i) => {
        return (
          <Pressable
            key={album?._id}
            w="50%"
            pr={2}
            onPress={() => onAlbumSelect(album._id)}
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
                  {/* TODO: randomly choose svg and color */}
                  <House size={100} />
                </Center>
              )}
              <Box w="100%" mt={3}>
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
        childId={data?.getAlbumsForChild.id!}
      />
    </Row>
  );
}

export default AlbumGrid;
