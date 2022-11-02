/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["mongo_uri"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
const { connectToDatabase } = require('/opt/dbConnect');

const ObjectID = require('mongodb').ObjectID;
const { v4: uuidv4 } = require('uuid');
// const aws = require('aws-sdk');
// const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const updatePhotoProps = async (event) => {
  const { id: photoId, ...rest } = event?.arguments?.input;
  const { photoCollection } = await connectToDatabase();
  const res = await photoCollection.findOneAndUpdate(
    {
      _id: new ObjectID(photoId),
    },
    {
      $set: {
        ...rest,
      },
    },
    {
      returnDocument: 'after',
    }
  );
  return res.value;
};

const getChildrenUnsortedPhotos = async (event) => {
  const userId = event?.identity?.sub;
  const { userCollection, photoCollection } = await connectToDatabase();
  const user = await userCollection.findOne({ userId });
  const childrenObjects = user?.children;
  const unsortedPhotos = await photoCollection
    .aggregate([
      {
        $match: {
          accountId: user.accountId,
          childId: {
            $in: childrenObjects.map((c) => c.id),
          },
          albums: {
            $size: 0,
          },
        },
      },
      {
        $group: {
          _id: '$childId',
          photos: {
            $push: {
              _id: '$_id',
              bucketName: '$bucketName',
              objectKey: '$objectKey',
              dateOfPhoto: '$dateOfPhoto',
              description: '$description',
              childId: '$childId',
              thumbnailKey: '$thumbnailKey',
            },
          },
        },
      },
    ])
    .toArray();
  return unsortedPhotos.map((p) => {
    const childObj = childrenObjects.find((c) => c.id === p._id);
    return {
      photos: p.photos,
      _id: childObj.id,
      childName: childObj.name,
    };
  });
};

const getChildrenAlbums = async (event) => {
  const userId = event?.identity?.sub;
  const { albumCollection, userCollection } = await connectToDatabase();
  const user = await userCollection.findOne({ userId });
  const { accountId } = user;
  const albums = await albumCollection
    .find({
      accountId,
    })
    .toArray();
  const childrenObjects = user?.children;
  // need to create an object for each child
  const noOwnerAlbums = albums.filter((album) => !album.childId);
  const childrenAlbums = childrenObjects.reduce((res, currentChild) => {
    const filteredAlbums = albums.filter(
      (album) => album.childId === currentChild.id
    );
    res.push({
      id: currentChild.id,
      name: currentChild.name,
      albums: filteredAlbums,
    });
    return res;
  }, noOwnerAlbums);
  return childrenAlbums;
};

const getPhotosForAlbum = async (event) => {
  const { albumId, limit, nextToken, childId } = event?.arguments?.input;
  // TODO: move user fetching to middleware
  const userId = event?.identity?.sub;
  const { photoCollection, userCollection, albumCollection } =
    await connectToDatabase();
  const user = await userCollection.findOne({ userId });
  if (childId) {
    const photos = await photoCollection
      .find({
        childId,
      })
      .toArray();
    return {
      _id: null,
      name: 'All',
      description: '',
      childId,
      photos,
    };
  } else {
    const album = await albumCollection.findOne({ _id: new ObjectID(albumId) });
    const photos = await photoCollection
      .find({
        accountId: user.accountId,
        albums: {
          $in: [new ObjectID(albumId)],
        },
      })
      .toArray();

    return {
      _id: album._id,
      name: album.name,
      description: album.description,
      childId: album.childId,
      photos,
    };
  }
};

const getUser = async (event, context) => {
  const { userCollection } = await connectToDatabase();
  const res = await userCollection.findOne({
    userId: event?.identity?.sub,
  });
  return res;
};

const addChild = async (event) => {
  const { userCollection } = await connectToDatabase();
  const childId = uuidv4();
  const res = await userCollection.findOneAndUpdate(
    {
      userId: event?.identity?.sub,
    },
    {
      $push: {
        children: {
          id: childId,
          name: event?.arguments?.input?.name,
          age: event?.arguments?.input?.age,
        },
      },
    },
    {
      returnDocument: 'after',
    }
  );
  return res.value;
};

const deleteUnsortedPhotos = async (event) => {
  const { photoCollection } = await connectToDatabase();
  const { ids } = event?.arguments?.input;
  await photoCollection.deleteMany({
    _id: {
      $in: ids.map((id) => new ObjectID(id)),
    },
  });
  return await getChildrenUnsortedPhotos(event);
};

const assignPhotosToChild = async (event) => {
  const { photoCollection } = await connectToDatabase();
  const { ids, childId } = event?.arguments?.input;
  await photoCollection.updateMany(
    {
      _id: {
        $in: ids.map((id) => new ObjectID(id)),
      },
    },
    {
      $set: {
        childId,
      },
    }
  );
  return await getChildrenUnsortedPhotos(event);
};

const resolvers = {
  Mutation: {
    updatePhotoProps: (event) => updatePhotoProps(event),
    addChild: (event) => addChild(event),
    deleteUnsortedPhotos: (event) => deleteUnsortedPhotos(event),
    assignPhotosToChild: (event) => assignPhotosToChild(event),
  },
  Query: {
    getChildrenAlbums: (event) => getChildrenAlbums(event),
    getPhotosForAlbum: (event) => getPhotosForAlbum(event),
    getUser: (event, context) => getUser(event, context),
    getChildrenUnsortedPhotos: (event, context) =>
      getChildrenUnsortedPhotos(event, context),
  },
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event, context);
    }
  }
  throw new Error('Resolver not found.');
};
