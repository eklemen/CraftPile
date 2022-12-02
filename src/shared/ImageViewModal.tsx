// import { Dimensions } from 'react-native';
// import { PileCD } from '../context/constants';
// import { Modal } from 'native-base';
// import PileAlbumSelectSheet from '../screens/Pile/PileAlbumSelectSheet';
// import { Image } from 'react-native-expo-image-cache';
// import PileActionBarSingle from '../screens/Pile/PileActionBarSingle';
//
// function ImageViewModal() {
//   return (
//     <Modal
//       size="full"
//       isOpen={Boolean(pileCompData.selectedPhoto!)}
//       onClose={() => {
//         setPileData({
//           multiSelect: false,
//           selectedPhotos: {},
//           selectedPhoto: null,
//           showChildSelectModal: false,
//         } as Partial<PileCD>);
//       }}
//       _backdrop={{
//         opacity: 0.65,
//       }}
//     >
//       <Modal.Content flex={1}>
//         <Modal.CloseButton />
//         {pileCompData.showAlbumSelectModal ? (
//           <>
//             <PileAlbumSelectSheet
//               isOpen={pileCompData.showAlbumSelectModal}
//               onClose={() => setPileData({ showAlbumSelectModal: false })}
//               onAlbumSelect={addPhotosToAlbumHandler}
//               pileCompData={pileCompData}
//             />
//           </>
//         ) : (
//           <>
//             <Modal.Body
//               h={Dimensions.get('window').height * 0.6}
//               alignItems="stretch"
//               display="flex"
//             >
//               <Image
//                 uri={cachedPhotos[pileCompData.selectedPhoto?.thumbnailKey!]}
//                 style={{
//                   resizeMode: 'contain',
//                   width: '100%',
//                   height: '95%',
//                 }}
//               />
//             </Modal.Body>
//             <Modal.Footer>
//               <PileActionBarSingle
//                 selectedPhoto={pileCompData.selectedPhoto}
//                 setPileData={setPileData}
//               />
//             </Modal.Footer>
//           </>
//         )}
//       </Modal.Content>
//     </Modal>
//   );
// }
//
// export default ImageViewModal;
