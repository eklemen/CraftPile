/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type updatePhotoPropertiesInput = {
  id: string,
  dateOfPhoto?: string | null,
  title?: string | null,
  description?: string | null,
  childId?: string | null,
  albums?: Array< string | null > | null,
  tags?: Array< string | null > | null,
};

export type Photo = {
  __typename: "Photo",
  _id?: string | null,
  bucketName: string,
  objectKey: string,
  thumbnailKey: string,
  localPath?: string | null,
  dateOfPhoto: string,
  title?: string | null,
  description?: string | null,
  childId: string,
  accountId: string,
  albums?: Array< string > | null,
};

export type addChildInput = {
  name: string,
  age?: number | null,
};

export type User = {
  __typename: "User",
  _id: string,
  userId: string,
  email: string,
  accountId: string,
  children:  Array<Child | null >,
};

export type Child = {
  __typename: "Child",
  id: string,
  name: string,
  age?: number | null,
};

export type deletePhotosInput = {
  ids: Array< string | null >,
};

export type ChildUnsortedPhotos = {
  __typename: "ChildUnsortedPhotos",
  _id?: UnsortedId | null,
  photos?:  Array<UnsortedPhoto > | null,
};

export type UnsortedId = {
  __typename: "UnsortedId",
  childId: string,
  name: string,
};

export type UnsortedPhoto = {
  __typename: "UnsortedPhoto",
  _id: string,
  bucketName: string,
  objectKey: string,
  dateOfPhoto: string,
  childId: string,
  thumbnailKey: string,
  localPath?: string | null,
};

export type getPhotosForAlbumInput = {
  albumId?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  childId?: string | null,
};

export type PhotosForAlbum = {
  __typename: "PhotosForAlbum",
  _id: string,
  name: string,
  description?: string | null,
  childId: string,
  photos?:  Array<Photo > | null,
};

export type ChildAlbums = {
  __typename: "ChildAlbums",
  id: string,
  name: string,
  albums?:  Array<Album > | null,
};

export type Album = {
  __typename: "Album",
  _id?: string | null,
  name?: string | null,
  description?: string | null,
  childId?: string | null,
  posterImage?: Photo | null,
};

export type UpdatePhotoPropsMutationVariables = {
  input?: updatePhotoPropertiesInput | null,
};

export type UpdatePhotoPropsMutation = {
  updatePhotoProps?:  {
    __typename: "Photo",
    _id?: string | null,
    bucketName: string,
    objectKey: string,
    thumbnailKey: string,
    localPath?: string | null,
    dateOfPhoto: string,
    title?: string | null,
    description?: string | null,
    childId: string,
    accountId: string,
    albums?: Array< string > | null,
  } | null,
};

export type AddChildMutationVariables = {
  input?: addChildInput | null,
};

export type AddChildMutation = {
  addChild:  {
    __typename: "User",
    _id: string,
    userId: string,
    email: string,
    accountId: string,
    children:  Array< {
      __typename: "Child",
      id: string,
      name: string,
      age?: number | null,
    } | null >,
  },
};

export type DeleteUnsortedPhotosMutationVariables = {
  input: deletePhotosInput,
};

export type DeleteUnsortedPhotosMutation = {
  deleteUnsortedPhotos?:  Array< {
    __typename: "ChildUnsortedPhotos",
    _id?:  {
      __typename: "UnsortedId",
      childId: string,
      name: string,
    } | null,
    photos?:  Array< {
      __typename: "UnsortedPhoto",
      _id: string,
      bucketName: string,
      objectKey: string,
      dateOfPhoto: string,
      childId: string,
      thumbnailKey: string,
      localPath?: string | null,
    } > | null,
  } > | null,
};

export type GetPhotosForAlbumQueryVariables = {
  input?: getPhotosForAlbumInput | null,
};

export type GetPhotosForAlbumQuery = {
  getPhotosForAlbum?:  {
    __typename: "PhotosForAlbum",
    _id: string,
    name: string,
    description?: string | null,
    childId: string,
    photos?:  Array< {
      __typename: "Photo",
      _id?: string | null,
      bucketName: string,
      objectKey: string,
      thumbnailKey: string,
      localPath?: string | null,
      dateOfPhoto: string,
      title?: string | null,
      description?: string | null,
      childId: string,
      accountId: string,
      albums?: Array< string > | null,
    } > | null,
  } | null,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    _id: string,
    userId: string,
    email: string,
    accountId: string,
    children:  Array< {
      __typename: "Child",
      id: string,
      name: string,
      age?: number | null,
    } | null >,
  },
};

export type GetChildrenAlbumsQuery = {
  getChildrenAlbums?:  Array< {
    __typename: "ChildAlbums",
    id: string,
    name: string,
    albums?:  Array< {
      __typename: "Album",
      _id?: string | null,
      name?: string | null,
      description?: string | null,
      childId?: string | null,
    } > | null,
  } | null > | null,
};

export type GetChildrenUnsortedPhotosQuery = {
  getChildrenUnsortedPhotos?:  Array< {
    __typename: "ChildUnsortedPhotos",
    _id?:  {
      __typename: "UnsortedId",
      childId: string,
      name: string,
    } | null,
    photos?:  Array< {
      __typename: "UnsortedPhoto",
      _id: string,
      bucketName: string,
      objectKey: string,
      dateOfPhoto: string,
      childId: string,
      thumbnailKey: string,
      localPath?: string | null,
    } > | null,
  } > | null,
};
