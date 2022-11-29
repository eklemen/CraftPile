import type { RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Landing: { name?: string };
  ManageChildren: { name?: string };
  MainStack: { name?: string };
  // Camera: { name: string };
  // Albums: { name: string };
  // AlbumPhotos: {
  //   name: string;
  //   albumId: string;
  //   allImages: boolean;
  //   childId: string;
  // };
};

export type AlbumStackParamList = {
  AlbumScreen: { name?: string };
  AlbumPhotos: {
    name?: string;
    albumId: string;
  };
};

export type LandingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Landing'
>;

export type ManageChildrenScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ManageChildren'
>;

export type CameraScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Camera'
>;

export type AlbumPhotosScreenRouteProp = RouteProp<
  RootStackParamList,
  'AlbumPhotos2'
>;

export type AlbumScreenNavigationProp = StackNavigationProp<
  AlbumStackParamList,
  'AlbumScreen'
>;

export type AlbumPhotosScreenNavigationProp = StackNavigationProp<
  AlbumStackParamList,
  'AlbumPhotos'
>;
