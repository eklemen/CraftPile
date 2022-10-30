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
export const deleteUnsortedPhotos = /* GraphQL */ `
  mutation DeleteUnsortedPhotos($input: deletePhotosInput!) {
    deleteUnsortedPhotos(input: $input) {
      _id {
        childId
        name
      }
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
