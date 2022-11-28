import { useEffect } from 'react';
import {
  Actionsheet,
  Box,
  Column,
  Heading,
  Row,
  Skeleton,
  Text,
} from 'native-base';
import lodashKeys from 'lodash.keys';
import isEmpty from 'lodash.isempty';
import { gql, useLazyQuery } from '@apollo/client';
import { PileCD } from '../../context/constants';
import {
  GetAlbumsForChildQuery,
  GetAlbumsForChildQueryVariables,
} from '../../generated/API';
import { getAlbumsForChild } from '../../graphql/queries';
import AlbumGrid from '../../shared/AlbumGrid';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAlbumSelect: (albumId: string) => void;
  pileCompData: PileCD;
}

function PileAlbumSelectSheet({
  isOpen,
  onClose,
  onAlbumSelect,
  pileCompData,
}: Props) {
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
  const [getAlbums, { loading, data, error }] = useLazyQuery<
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
          <AlbumGrid
            loading={loading}
            data={data}
            onAlbumSelect={onAlbumSelect}
          />
        </Column>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default PileAlbumSelectSheet;