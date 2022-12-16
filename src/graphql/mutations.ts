/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updatePhotoProps = /* GraphQL */ `
  mutation UpdatePhotoProps($input: updatePhotoPropertiesInput) {
    updatePhotoProps(input: $input) {
      _id
      bucketName
      objectKey
      thumbnailKey
      localPath
      dateOfPhoto
      title
      description
      childId
      accountId
      albums
    }
  }
`;
export const addChild = /* GraphQL */ `
  mutation AddChild($input: addChildInput) {
    addChild(input: $input) {
      _id
      userId
      email
      accountId
      children {
        id
        name
        age
      }
    }
  }
`;
export const deletePhotosInAlbum = /* GraphQL */ `
  mutation DeletePhotosInAlbum($input: deletePhotosInAlbumInput!) {
    deletePhotosInAlbum(input: $input) {
      _id
      name
      description
      childId
      accountId
      posterImage
      photos {
        _id
        bucketName
        objectKey
        thumbnailKey
        localPath
        dateOfPhoto
        title
        description
        childId
        accountId
        albums
      }
    }
  }
`;
export const assignPhotosToChildInAlbums = /* GraphQL */ `
  mutation AssignPhotosToChildInAlbums($input: reassignPhotosToChildInput!) {
    assignPhotosToChildInAlbums(input: $input) {
      _id
      bucketName
      objectKey
      thumbnailKey
      localPath
      dateOfPhoto
      title
      description
      childId
      accountId
      albums
    }
  }
`;
export const deleteUnsortedPhotos = /* GraphQL */ `
  mutation DeleteUnsortedPhotos($input: photoIdsInput!) {
    deleteUnsortedPhotos(input: $input) {
      _id
      childName
      photos {
        _id
        bucketName
        objectKey
        dateOfPhoto
        childId
        thumbnailKey
        localPath
      }
    }
  }
`;
export const assignPhotosToChild = /* GraphQL */ `
  mutation AssignPhotosToChild($input: assignPhotosToChildInput!) {
    assignPhotosToChild(input: $input) {
      _id
      childName
      photos {
        _id
        bucketName
        objectKey
        dateOfPhoto
        childId
        thumbnailKey
        localPath
      }
    }
  }
`;
export const addUnsortedPhotosToAlbum = /* GraphQL */ `
  mutation AddUnsortedPhotosToAlbum($input: addUnsortedPhotosToAlbumInput!) {
    addUnsortedPhotosToAlbum(input: $input) {
      _id
      childName
      photos {
        _id
        bucketName
        objectKey
        dateOfPhoto
        childId
        thumbnailKey
        localPath
      }
    }
  }
`;
export const createAlbum = /* GraphQL */ `
  mutation CreateAlbum($input: createAlbumInput!) {
    createAlbum(input: $input) {
      id
      name
      albums {
        _id
        name
        description
        childId
        posterImage
      }
    }
  }
`;
