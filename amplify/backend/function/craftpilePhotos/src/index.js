var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
    var _a;
    const _b = (_a = event === null || event === void 0 ? void 0 : event.arguments) === null || _a === void 0 ? void 0 : _a.input, { id: photoId } = _b, rest = __rest(_b, ["id"]);
    const { photoCollection } = await connectToDatabase();
    const res = await photoCollection.findOneAndUpdate({
        _id: new ObjectID(photoId),
    }, {
        $set: Object.assign({}, rest),
    }, {
        returnDocument: 'after',
    });
    return res.value;
};
const getChildrenUnsortedPhotos = async (event) => {
    var _a;
    const userId = (_a = event === null || event === void 0 ? void 0 : event.identity) === null || _a === void 0 ? void 0 : _a.sub;
    const { userCollection, photoCollection, childrenCollection } = await connectToDatabase();
    const user = await userCollection.findOne({ userId });
    const childrenObjects = await childrenCollection
        .find({
        accountId: user.accountId,
    })
        .toArray();
    const unsortedPhotos = await photoCollection
        .aggregate([
        {
            $match: {
                accountId: user.accountId,
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
    return childrenObjects.map((c) => {
        var _a;
        return {
            _id: c._id,
            childName: c.name,
            photos: ((_a = unsortedPhotos.find((u) => c._id.equals(u._id))) === null || _a === void 0 ? void 0 : _a.photos) || [],
        };
    });
};
const getChildrenAlbums = async (event) => {
    var _a;
    const userId = (_a = event === null || event === void 0 ? void 0 : event.identity) === null || _a === void 0 ? void 0 : _a.sub;
    const { albumCollection, userCollection, childrenCollection } = await connectToDatabase();
    const user = await userCollection.findOne({ userId });
    const { accountId } = user;
    const albums = await albumCollection
        .find({
        accountId,
    })
        .toArray();
    const childrenObjects = await childrenCollection
        .find({
        accountId,
    })
        .toArray();
    // need to create an object for each child
    const childrenAlbums = childrenObjects.reduce((res, currentChild) => {
        const filteredAlbums = albums.filter((album) => currentChild._id.equals(album.childId));
        res.push({
            _id: new ObjectID(currentChild._id),
            name: currentChild.name,
            albums: filteredAlbums,
        });
        return res;
    }, []);
    return childrenAlbums;
};
const getPhotosForAlbum = async (event) => {
    var _a;
    const { albumId, limit, nextToken, childId } = (_a = event === null || event === void 0 ? void 0 : event.arguments) === null || _a === void 0 ? void 0 : _a.input;
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
    return Object.assign(Object.assign({}, album), { photos });
};
const getUser = async (event) => {
    var _a;
    const { userCollection, childrenCollection } = await connectToDatabase();
    const user = await userCollection.findOne({
        userId: (_a = event === null || event === void 0 ? void 0 : event.identity) === null || _a === void 0 ? void 0 : _a.sub,
    });
    const children = await childrenCollection
        .find({ accountId: user.accountId })
        .toArray();
    const res = { user };
    return Object.assign(Object.assign({}, user), { children });
};
const getChildren = async (event) => {
    var _a, _b, _c;
    const { userCollection, childrenCollection } = await connectToDatabase();
    let accountId = (_b = (_a = event === null || event === void 0 ? void 0 : event.arguments) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.accountId;
    if (!accountId) {
        const user = await userCollection.findOne({
            userId: (_c = event === null || event === void 0 ? void 0 : event.identity) === null || _c === void 0 ? void 0 : _c.sub,
        });
        accountId = user.accountId;
    }
    return await childrenCollection
        .find({
        accountId,
    })
        .toArray();
};
// Handles both adding and updating a child
const addChild = async (event) => {
    var _a, _b, _c;
    const { childrenCollection } = await connectToDatabase();
    const { name, _id, accountId } = (_a = event === null || event === void 0 ? void 0 : event.arguments) === null || _a === void 0 ? void 0 : _a.input;
    if (_id) {
        await childrenCollection.updateOne({
            _id: new ObjectID(_id),
        }, {
            $set: {
                name,
            },
        });
    }
    else {
        await childrenCollection.insertOne({
            name: (_c = (_b = event === null || event === void 0 ? void 0 : event.arguments) === null || _b === void 0 ? void 0 : _b.input) === null || _c === void 0 ? void 0 : _c.name,
            accountId,
        });
    }
    return await childrenCollection
        .find({
        accountId,
    })
        .toArray();
};
const deleteChild = async (event) => {
    var _a;
    const { childrenCollection } = await connectToDatabase();
    const { _id } = (_a = event === null || event === void 0 ? void 0 : event.arguments) === null || _a === void 0 ? void 0 : _a.input;
    await childrenCollection.deleteOne({
        _id: new ObjectID(_id),
    });
    return await getChildren(event);
};
const deleteUnsortedPhotos = async (event) => {
    var _a;
    const { photoCollection } = await connectToDatabase();
    const { ids } = (_a = event === null || event === void 0 ? void 0 : event.arguments) === null || _a === void 0 ? void 0 : _a.input;
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
    var _a;
    const { photoCollection } = await connectToDatabase();
    const { ids } = (_a = event === null || event === void 0 ? void 0 : event.arguments) === null || _a === void 0 ? void 0 : _a.input;
    await photoCollection.deleteMany({
        _id: {
            $in: ids.map((id) => new ObjectID(id)),
        },
    });
    return await getPhotosForAlbum(event);
};
const assignPhotosToChild = async (event) => {
    var _a;
    const { photoCollection } = await connectToDatabase();
    const { ids, childId } = (_a = event === null || event === void 0 ? void 0 : event.arguments) === null || _a === void 0 ? void 0 : _a.input;
    await photoCollection.updateMany({
        _id: {
            $in: ids.map((id) => new ObjectID(id)),
        },
    }, {
        $set: {
            childId: new ObjectID(childId),
        },
    });
    return await getChildrenUnsortedPhotos(event);
};
const addUnsortedPhotosToAlbum = async (event) => {
    var _a;
    const { photoCollection } = await connectToDatabase();
    const { ids, albumId } = (_a = event === null || event === void 0 ? void 0 : event.arguments) === null || _a === void 0 ? void 0 : _a.input;
    await photoCollection.updateMany({
        _id: {
            $in: ids.map((id) => new ObjectID(id)),
        },
    }, {
        $push: {
            albums: new ObjectID(albumId),
        },
    });
    return await getChildrenUnsortedPhotos(event);
};
// reassign a photo to a different child's album
const reassignPhotosToChildAndAlbum = async (event) => {
    var _a;
    const { photoCollection } = await connectToDatabase();
    const { ids, albumId, childId } = (_a = event === null || event === void 0 ? void 0 : event.arguments) === null || _a === void 0 ? void 0 : _a.input;
    await photoCollection.updateMany({
        _id: {
            $in: ids.map((id) => new ObjectID(id)),
        },
    }, {
        $set: {
            albums: [new ObjectID(albumId)],
            childId: new ObjectID(childId),
        },
    });
    return await photoCollection
        .find({
        childId: new ObjectID(childId),
    })
        .toArray();
};
const getAlbumsForChild = async (event) => {
    var _a;
    const { albumCollection, childrenCollection } = await connectToDatabase();
    const { childId } = (_a = event === null || event === void 0 ? void 0 : event.arguments) === null || _a === void 0 ? void 0 : _a.input;
    const albums = await albumCollection
        .find({
        childId: new ObjectID(childId),
    })
        .toArray();
    const child = await childrenCollection.findOne({
        _id: new ObjectID(childId),
    });
    return Object.assign(Object.assign({}, child), { albums });
};
const createAlbum = async (event) => {
    var _a;
    const { albumCollection } = await connectToDatabase();
    const { name, description, childId, accountId } = (_a = event === null || event === void 0 ? void 0 : event.arguments) === null || _a === void 0 ? void 0 : _a.input;
    const album = await albumCollection.insertOne({
        name,
        description,
        childId: new ObjectID(childId),
        accountId,
    });
    if (album === null || album === void 0 ? void 0 : album.insertedId) {
        return await getAlbumsForChild(Object.assign(Object.assign({}, event), { arguments: { input: { childId } } }));
    }
    else {
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
        assignPhotosToChildInAlbums: (event) => reassignPhotosToChildAndAlbum(event),
        // pile / unsorted photos
        addUnsortedPhotosToAlbum: (event) => addUnsortedPhotosToAlbum(event),
        deleteUnsortedPhotos: (event) => deleteUnsortedPhotos(event),
        deleteChild: (event) => deleteChild(event),
    },
    Query: {
        getChildrenAlbums: (event) => getChildrenAlbums(event),
        getAlbumsForChild: (event) => getAlbumsForChild(event),
        getPhotosForAlbum: (event) => getPhotosForAlbum(event),
        getUser: (event) => getUser(event),
        getChildrenUnsortedPhotos: (event) => getChildrenUnsortedPhotos(event),
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
