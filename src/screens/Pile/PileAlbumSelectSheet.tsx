import { useEffect } from 'react';
import {
  Actionsheet,
  Box,
  Center,
  Column,
  Heading,
  Pressable,
  Row,
  Skeleton,
  Text,
} from 'native-base';
import lodashKeys from 'lodash.keys';
import isEmpty from 'lodash.isempty';
import { gql, useLazyQuery } from '@apollo/client';
import useCompData from '../../context/compData/useCompData';
import { PILE, PileCD } from '../../context/constants';
import {
  GetAlbumsForChildQuery,
  GetAlbumsForChildQueryVariables,
} from '../../generated/API';
import { getAlbumsForChild } from '../../graphql/queries';
import ImageBox from './ImageBox';
import House from '../../appIcons/House';
import ImageGridSkeleton from '../../shared/ImageGridSkeleton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAlbumSelect: (albumId: string) => void;
}

function PileAlbumSelectSheet({ isOpen, onClose, onAlbumSelect }: Props) {
  const { compData: pileCompData, clearComp: resetPileData } =
    useCompData<PileCD>(PILE);
  const getChildId = (): string => {
    if (pileCompData.multiSelect && !isEmpty(pileCompData.selectedPhotos)) {
      const key = lodashKeys(pileCompData.selectedPhotos)[0];
      return pileCompData.selectedPhotos[key].childId;
    } else if (!isEmpty(pileCompData.selectedPhoto)) {
      return pileCompData!.selectedPhoto!.childId;
    } else {
      return '';
    }
  };
  const [getAlbums, { called, loading, data, error }] = useLazyQuery<
    GetAlbumsForChildQuery,
    GetAlbumsForChildQueryVariables
  >(gql(getAlbumsForChild));
  useEffect(() => {
    if (isOpen) {
      getAlbums({
        variables: {
          input: {
            childId: getChildId(),
          },
        },
      });
    }
  }, [isOpen]);
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} height="100%">
      <Actionsheet.Content px={4}>
        <Column h="100%" w="100%">
          <Heading size="2xl" w="100%" mb={4}>
            Add to album
          </Heading>
          <Row alignItems="center" mb={4}>
            <Skeleton isLoaded={!loading}>
              <Box
                h={35}
                w={35}
                rounded="full"
                bg="primary.100"
                alignItems="center"
                justifyContent="center"
                mr={3}
              >
                <Text color="white">P</Text>
              </Box>
              <Heading size="md">
                {`${data?.getAlbumsForChild?.name}'s album`}
              </Heading>
            </Skeleton>
          </Row>
          <Row flexWrap="wrap">
            <ImageGridSkeleton isLoaded={!loading} />

            {data?.getAlbumsForChild?.albums?.map((album) => {
              return (
                <Pressable
                  key={album?._id}
                  w="50%"
                  pr={2}
                  onPress={() => onAlbumSelect(album._id)}
                >
                  <Box
                    w="100%"
                    px={1}
                    alignItems="center"
                    justifyContent="center"
                  >
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
                  </Box>
                </Pressable>
              );
            })}
          </Row>
        </Column>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default PileAlbumSelectSheet;
