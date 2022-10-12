export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "craftpile7a76396a": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "api": {
        "craftpile": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "function": {
        "craftpilePhotos": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "S3Trigger42c71366": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "craftpile7a76396aPostConfirmation": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        },
        "craftpiledbConnectLayer": {
            "Arn": "string"
        },
        "craftpileV3ClientSDK": {
            "Arn": "string"
        }
    },
    "storage": {
        "CraftPilePhotoStorage": {
            "BucketName": "string",
            "Region": "string"
        }
    }
}