import { useState, useEffect } from 'react';
import {
  Button,
  Center,
  Column,
  Heading,
  Modal,
  Radio,
  Row,
  Text,
} from 'native-base';
import { AUTH, PILE, PileCD, UserCD } from '../../context/constants';
import useCompData from '../../context/compData/useCompData';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  AssignPhotosToChildMutation,
  AssignPhotosToChildMutationVariables,
  GetUserQuery,
} from '../../generated/API';
import { assignPhotosToChild } from '../../graphql/mutations';
import { getUser } from '../../graphql/queries';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function ChildSelectModal({ isOpen, onClose }: Props) {
  const { data: userData } = useQuery<GetUserQuery>(gql(getUser));
  const { compData: pileCompData, clearComp: resetPileData } =
    useCompData<PileCD>(PILE);
  const [assignPhotos, { loading, error }] = useMutation<
    AssignPhotosToChildMutation,
    AssignPhotosToChildMutationVariables
  >(gql(assignPhotosToChild));
  const [radioValue, setRadioValue] = useState<string>();
  const [initialChildId, setInitialChildId] = useState<string>();
  useEffect(() => {
    const hasSelectedChild =
      pileCompData?.selectedPhotos &&
      Boolean(Object.keys(pileCompData.selectedPhotos).length);
    const selectedChild = hasSelectedChild
      ? Object.values(pileCompData?.selectedPhotos)[0]?.childId
      : undefined;
    setInitialChildId(selectedChild);
    setRadioValue(selectedChild);
  }, [pileCompData.selectedPhotos]);

  const handleSave = async () => {
    if (initialChildId !== radioValue) {
      await assignPhotos({
        variables: {
          input: {
            ids: Object.keys(pileCompData.selectedPhotos) || [],
            childId: radioValue!,
          },
        },
      });
    }
    resetPileData({
      multiSelect: false,
      selectedPhotos: {},
      selectedPhoto: null,
    });
    onClose();
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
          </Column>
        </Modal.Body>
        <Modal.Footer borderTopWidth={0}>
          <Button
            colorScheme="secondary"
            flex={1}
            h={70}
            onPress={handleSave}
            isLoading={loading}
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

export default ChildSelectModal;
