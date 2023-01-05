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
    },
  );
  return res.value;
};

const getChildrenUnsortedPhotos = async (event) => {
  const userId = event?.identity?.sub;
  const { userCollection, photoCollection, childrenCollection } = await connectToDatabase();
  const user = await userCollection.findOne({ userId });
  const childrenObjects  = await childrenCollection.find({
    accountId: user.accountId
  }).toArray();
  /*
  find photos for account
  and album size is 0

   */
  const unsortedPhotos = await photoCollection
    .aggregate([
      {
        $match: {
          accountId: user.accountId,
          childId: {
            $in: childrenObjects.map((c) => new ObjectID(c._id)),
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
  return childrenObjects.map((child) => {
    return {
      _id: child._id, // todo: change to id,
      childName: child.name,
      photos: unsortedPhotos.find((p) => p._id === child._id)?.photos || [],
    };
  });
};

const getChildrenAlbums = async (event) => {
  const userId = event?.identity?.sub;
  const { albumCollection, userCollection, childrenCollection } = await connectToDatabase();
  const user = await userCollection.findOne({ userId });
  const { accountId } = user;
  const albums = await albumCollection
    .find({
      accountId,
    })
    .toArray();
  const childrenObjects = await childrenCollection.find({
    accountId: user.accountId
  }).toArray();
  // need to create an object for each child
  const childrenAlbums = childrenObjects.reduce((res, currentChild) => {
    const filteredAlbums = albums.filter(
      (album) => album.childId === currentChild._id,
    );
    res.push({
      id: currentChild._id,
      name: currentChild.name,
      albums: filteredAlbums,
    });
    return res;
  }, []);
  return childrenAlbums;
};

const getPhotosForAlbum = async (event) => {
  const { albumId, limit, nextToken, childId } = event?.arguments?.input;
  const { photoCollection, albumCollection } = await connectToDatabase();
  const photos = await photoCollection
    .find({
      childId: new ObjectID(childId),
      albums: {
        $in: [new ObjectID(albumId)],
      },
    })
    .toArray();

  const album = await albumCollection.findOne({ _id: new ObjectID(albumId) });
  return {
    ...album,
    photos,
  };
};

const getUser = async (event) => {
  const { userCollection, childrenCollection } = await connectToDatabase();
  console.log('getUser method: ');
  const user = await userCollection.findOne({
    userId: event?.identity?.sub,
  });
  console.log('user-------->', user);
  const children = await childrenCollection.find({ accountId: user.accountId }).toArray();
  console.log('children-------->', children);
  const res = { user };
  res.children = children;
  return {
    ...user,
    children,
  };
};

const getChildren = async (event) => {
  const { userCollection, childrenCollection } = await connectToDatabase();
  const user = await userCollection.findOne({
    userId: event?.identity?.sub,
  });
  return await childrenCollection.find({ accountId: user.accountId }).toArray();
};

const addChild = async (event) => {
  const { userCollection, childrenCollection } = await connectToDatabase();
  const user = await userCollection.findOne({
    userId: event?.identity?.sub,
  });
  // const childId = uuidv4();
  await childrenCollection.insertOne({
    name: event?.arguments?.input?.name,
    accountId: user.accountId,
  });
  return await childrenCollection.find({
    accountId: user.accountId
  }).toArray();
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

// Does this actually delete photos in a specific album?
// It should not remove a photo from the collection, just the album
const deletePhotosInAlbum = async (event) => {
  const { photoCollection } = await connectToDatabase();
  const { ids } = event?.arguments?.input;
  await photoCollection.deleteMany({
    _id: {
      $in: ids.map((id) => new ObjectID(id)),
    },
  });
  return await getPhotosForAlbum(event);
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
        childId: new ObjectID(childId),
      },
    },
  );
  return await getChildrenUnsortedPhotos(event);
};

const addUnsortedPhotosToAlbum = async (event) => {
  const { photoCollection } = await connectToDatabase();
  const { ids, albumId } = event?.arguments?.input;
  await photoCollection.updateMany(
    {
      _id: {
        $in: ids.map((id) => new ObjectID(id)),
      },
    },
    {
      $push: {
        albums: new ObjectID(albumId),
      },
    },
  );
  return await getChildrenUnsortedPhotos(event);
};

// reassign a photo to a different child's album
const reassignPhotosToChildAndAlbum = async (event) => {
  const { photoCollection } = await connectToDatabase();
  const { ids, albumId, childId } = event?.arguments?.input;
  await photoCollection.updateMany(
    {
      _id: {
        $in: ids.map((id) => new ObjectID(id)),
      },
    },
    {
      $set: {
        albums: [new ObjectID(albumId)],
        childId: new ObjectID(childId),
      },
    },
  );
  return await photoCollection.find({
    childId: new ObjectID(childId),
  }).toArray();
};

const getAlbumsForChild = async (event) => {
  const { albumCollection, childrenCollection } = await connectToDatabase();
  const { childId } = event?.arguments?.input;
  const albums = await albumCollection
    .find({
      childId: new ObjectID(childId),
    })
    .toArray();
  const child = await childrenCollection.findOne({
    _id: new ObjectID(childId),
  }).toArray();
  return {
    ...child,
    albums,
  };
};

const createAlbum = async (event) => {
  const { albumCollection } = await connectToDatabase();
  const { name, description, childId, accountId } = event?.arguments?.input;
  const album = await albumCollection.insertOne({
    name,
    description,
    childId: new ObjectID(childId),
    accountId,
  });
  if (album?.insertedId) {
    return await getAlbumsForChild({
      ...event,
      arguments: { input: { childId } },
    });
  } else {
    throw new Error('Failed to create album');
  }
};

const resolvers = {
  Mutation: {
    updatePhotoProps: (event) => updatePhotoProps(event),
    addChild: (event) => addChild(event),
    assignPhotosToChild: (event) => assignPhotosToChild(event),
    createAlbum: (event) => createAlbum(event),
    deletePhotosInAlbum: (event) => deletePhotosInAlbum(event),
    assignPhotosToChildInAlbums: (event) =>
      reassignPhotosToChildAndAlbum(event),
    // pile / unsorted photos
    addUnsortedPhotosToAlbum: (event) => addUnsortedPhotosToAlbum(event),
    deleteUnsortedPhotos: (event) => deleteUnsortedPhotos(event),
  },
  Query: {
    getChildrenAlbums: (event) => getChildrenAlbums(event),
    getAlbumsForChild: (event) => getAlbumsForChild(event),
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
