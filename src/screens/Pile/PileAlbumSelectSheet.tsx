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
import { PILE, PileCD } from '../../context/constants';
import AlbumGrid from '../../shared/AlbumGrid';
import useCompData from '../../context/compData/useCompData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function PileAlbumSelectSheet({ isOpen, onClose }: Props) {
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
  // const [getAlbums, { loading, data, error }] = useLazyQuery<
  //   GetAlbumsForChildQuery,
  //   GetAlbumsForChildQueryVariables
  // >(gql(getAlbumsForChild));
  useEffect(() => {
    if (isOpen) {
      // getAlbums({
      //   variables: {
      //     input: {
      //       childId: getChildId(),
      //     },
      //   },
      // });
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
            <Skeleton isLoaded={true /*!loading*/}>
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
                {/*{`${data?.getAlbumsForChild?.name}'s album`}*/}
                {'Album name'}
              </Heading>
            </Skeleton>
          </Row>
          <AlbumGrid
            loading={false /*loading*/}
            data={[] /*data?.getAlbumsForChild?.albums || []*/}
            selectedPhotos={pileCompData.selectedPhotos}
            resetPileData={resetPileData}
          />
        </Column>
      </Actionsheet.Content>
    </Actionsheet>
  );
}

export default PileAlbumSelectSheet;
