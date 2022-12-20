import type {
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Landing: undefined;
  ManageChildren: undefined;
  MainStack: BottomTabNavigationProp<MainStackParamList>;
};

export type AlbumStackParamList = {
  AlbumScreen: undefined;
  AlbumPhotos: {
    name?: string;
    childName?: string;
    albumId: string;
    childId: string;
  };
  ViewAllAlbums: {
    name?: string;
    childId: string;
  };
};

export type MainStackParamList = {
  Camera: undefined;
  Pile: undefined;
  Albums: StackNavigationProp<AlbumStackParamList, 'AlbumScreen'>;
  Profile: undefined;
};

export type LandingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Landing'
>;

export type ManageChildrenScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ManageChildren'
>;

export type AlbumScreenNavigationProp = StackNavigationProp<
  AlbumStackParamList,
  'AlbumScreen'
>;

export type AlbumPhotosScreenNavigationProp = StackScreenProps<
  AlbumStackParamList,
  'AlbumPhotos'
>;

export type ViewAllAlbumsScreenNavigationProp = StackScreenProps<
  AlbumStackParamList,
  'ViewAllAlbums'
>;
