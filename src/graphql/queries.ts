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
      photos {
        _id
        bucketName
        objectKey
        dateOfPhoto
        title
        description
        childId
        accountId
        albums
        tags
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
        posterImage {
          _id
          bucketName
          objectKey
          dateOfPhoto
          title
          description
          childId
          accountId
          albums
          tags
        }
      }
    }
  }
`;
