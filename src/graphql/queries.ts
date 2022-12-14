/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPhotosForAlbum = /* GraphQL */ `
  query GetPhotosForAlbum($input: getPhotosForAlbumInput) {
    getPhotosForAlbum(input: $input) {
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
export const getUser = /* GraphQL */ `
  query GetUser {
    getUser {
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
export const getChildrenAlbums = /* GraphQL */ `
  query GetChildrenAlbums {
    getChildrenAlbums {
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
export const getChildrenUnsortedPhotos = /* GraphQL */ `
  query GetChildrenUnsortedPhotos {
    getChildrenUnsortedPhotos {
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
export const getAlbumsForChild = /* GraphQL */ `
  query GetAlbumsForChild($input: getAlbumsForChildInput!) {
    getAlbumsForChild(input: $input) {
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
