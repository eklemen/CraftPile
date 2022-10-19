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
  bucketName?: string | null,
  objectKey?: string | null,
  thumbnailKey?: string | null,
  localPath?: string | null,
  dateOfPhoto?: string | null,
  title?: string | null,
  description?: string | null,
  childId?: string | null,
  accountId?: string | null,
  albums?: Array< string | null > | null,
  tags?: Array< string | null > | null,
};

export type addChildInput = {
  name?: string | null,
  age?: number | null,
};

export type User = {
  __typename: "User",
  _id?: string | null,
  userId?: string | null,
  email?: string | null,
  accountId?: string | null,
  children?:  Array<Child | null > | null,
};

export type Child = {
  __typename: "Child",
  id?: string | null,
  name?: string | null,
  age?: number | null,
};

export type getPhotosForAlbumInput = {
  albumId?: string | null,
  limit?: number | null,
  nextToken?: string | null,
  childId?: string | null,
};

export type PhotosForAlbum = {
  __typename: "PhotosForAlbum",
  _id?: string | null,
  name?: string | null,
  description?: string | null,
  childId?: string | null,
  photos?:  Array<Photo | null > | null,
};

export type ChildAlbums = {
  __typename: "ChildAlbums",
  id?: string | null,
  name?: string | null,
  albums?:  Array<Album | null > | null,
};

export type Album = {
  __typename: "Album",
  _id?: string | null,
  name?: string | null,
  description?: string | null,
  childId?: string | null,
  posterImage?: Photo | null,
};

export type ChildUnsortedPhotos = {
  __typename: "ChildUnsortedPhotos",
  _id?: string | null,
  photos?:  Array<UnsortedPhoto | null > | null,
};

export type UnsortedPhoto = {
  __typename: "UnsortedPhoto",
  _id?: string | null,
  bucketName?: string | null,
  objectKey?: string | null,
  dateOfPhoto?: string | null,
  childId?: string | null,
  thumbnailKey?: string | null,
  localPath?: string | null,
};

export type UpdatePhotoPropsMutationVariables = {
  input?: updatePhotoPropertiesInput | null,
};

export type UpdatePhotoPropsMutation = {
  updatePhotoProps?:  {
    __typename: "Photo",
    _id?: string | null,
    bucketName?: string | null,
    objectKey?: string | null,
    thumbnailKey?: string | null,
    localPath?: string | null,
    dateOfPhoto?: string | null,
    title?: string | null,
    description?: string | null,
    childId?: string | null,
    accountId?: string | null,
    albums?: Array< string | null > | null,
    tags?: Array< string | null > | null,
  } | null,
};

export type AddChildMutationVariables = {
  input?: addChildInput | null,
};

export type AddChildMutation = {
  addChild?:  {
    __typename: "User",
    _id?: string | null,
    userId?: string | null,
    email?: string | null,
    accountId?: string | null,
    children?:  Array< {
      __typename: "Child",
      id?: string | null,
      name?: string | null,
      age?: number | null,
    } | null > | null,
  } | null,
};

export type GetPhotosForAlbumQueryVariables = {
  input?: getPhotosForAlbumInput | null,
};

export type GetPhotosForAlbumQuery = {
  getPhotosForAlbum?:  {
    __typename: "PhotosForAlbum",
    _id?: string | null,
    name?: string | null,
    description?: string | null,
    childId?: string | null,
    photos?:  Array< {
      __typename: "Photo",
      _id?: string | null,
      bucketName?: string | null,
      objectKey?: string | null,
      thumbnailKey?: string | null,
      localPath?: string | null,
      dateOfPhoto?: string | null,
      title?: string | null,
      description?: string | null,
      childId?: string | null,
      accountId?: string | null,
      albums?: Array< string | null > | null,
      tags?: Array< string | null > | null,
    } | null > | null,
  } | null,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    _id?: string | null,
    userId?: string | null,
    email?: string | null,
    accountId?: string | null,
    children?:  Array< {
      __typename: "Child",
      id?: string | null,
      name?: string | null,
      age?: number | null,
    } | null > | null,
  } | null,
};

export type GetChildrenAlbumsQuery = {
  getChildrenAlbums?:  Array< {
    __typename: "ChildAlbums",
    id?: string | null,
    name?: string | null,
    albums?:  Array< {
      __typename: "Album",
      _id?: string | null,
      name?: string | null,
      description?: string | null,
      childId?: string | null,
    } | null > | null,
  } | null > | null,
};

export type GetChildrenUnsortedPhotosQuery = {
  getChildrenUnsortedPhotos?:  Array< {
    __typename: "ChildUnsortedPhotos",
    _id?: string | null,
    photos?:  Array< {
      __typename: "UnsortedPhoto",
      _id?: string | null,
      bucketName?: string | null,
      objectKey?: string | null,
      dateOfPhoto?: string | null,
      childId?: string | null,
      thumbnailKey?: string | null,
      localPath?: string | null,
    } | null > | null,
  } | null > | null,
};
