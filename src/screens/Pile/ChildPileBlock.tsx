// import { Box, Heading, Pressable, Row, Skeleton } from 'native-base';
// import ImageBox from './ImageBox';
// import { ChildUnsortedPhotos } from '../../generated/API';
// import useCompData from '../../context/compData/useCompData';
// import { PILE, PileCD } from '../../context/constants';

// interface Props {
//   child: ChildUnsortedPhotos;
//   hideSkeleton?: boolean;
// }

// function ChildPileBlock({ child, hideSkeleton }: Props) {
//   const { compData: pileCompData, setData: setPileData } =
//     useCompData<PileCD>(PILE);
//   if (!child?.photos?.length) return null;
//   return (
//     <Box px={4} mb={5}>
//       <Skeleton
//         mb={4}
//         width="65%"
//         height="22"
//         rounded="md"
//         isLoaded={hideSkeleton}
//       >
//         <Heading size="md">{child?.childName}</Heading>
//       </Skeleton>
//       {/* TODO: make this flatlist or scrollview
//       with numColumns={2} */}
//       <Row flexWrap="wrap">
//         {child.photos?.map((photo) => {
//           const isMultiSelected = pileCompData.selectedPhotos?.hasOwnProperty(
//             photo?._id
//           );
//           return (
//             <Pressable
//               key={photo?._id}
//               w="50%"
//               pr={2}
//               my={1}
//               onPress={() => {
//                 if (pileCompData.multiSelect) {
//                   // if photo is selected, unselect it
//                   if (
//                     pileCompData?.selectedPhotos?.hasOwnProperty(photo?._id)
//                   ) {
//                     const selectedPhotos = { ...pileCompData.selectedPhotos };
//                     delete selectedPhotos[photo?._id];
//                     setPileData({
//                       selectedPhotos,
//                     });
//                   } else {
//                     // otherwise add photo
//                     setPileData({
//                       selectedPhotos: {
//                         ...pileCompData.selectedPhotos,
//                         [photo?._id]: photo!,
//                       },
//                     });
//                   }
//                 } else {
//                   // Single select
//                   setPileData({
//                     selectedPhoto: photo,
//                   });
//                 }
//               }}
//             >
//               <ImageBox
//                 photoUri={photo.thumbnailKey}
//                 isMultiSelected={isMultiSelected}
//               />
//             </Pressable>
//           );
//         })}
//       </Row>
//     </Box>
//   );
// }

// export default ChildPileBlock;
