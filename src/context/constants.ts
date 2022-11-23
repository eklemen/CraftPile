import {
  AddChildMutation,
  GetUserQuery,
  UnsortedPhoto,
} from '../generated/API';

export const AUTH = 'AUTH';
export const CAMERA = 'CAMERA';
export const ALBUMS = 'ALBUMS';
export const PILE = 'PILE';
export const CACHED_URLS = 'CACHED_URLS';

export interface UserCD {
  user?: GetUserQuery['getUser'] | AddChildMutation['addChild'];
}

type ChildArray = Pick<
  NonNullable<GetUserQuery['getUser']>,
  'children'
>['children'];
export type ChildT = NonNullable<NonNullable<ChildArray>[0]>;

export interface CameraCD {
  queue?: Record<string, { isComplete: boolean }>;
  selectedChild: ChildT | null;
}

export interface PileCD {
  selectedPhotos: {
    [key: string]: UnsortedPhoto;
  };
  selectedPhoto: UnsortedPhoto | null;
  multiSelect: boolean;
  showChildSelectModal: boolean;
  showAlbumSelectSheet: boolean;
}

export interface CachedUrlsCD {
  [key: string]: string;
}

export interface CompDataStateTree {
  [AUTH]: UserCD;
  [CAMERA]: CameraCD;
  [ALBUMS]: {};
  [PILE]: PileCD;
  [CACHED_URLS]: CachedUrlsCD;
}
