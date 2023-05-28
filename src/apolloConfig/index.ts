import { AuthOptions, createAuthLink } from 'aws-appsync-auth-link';
import { Auth } from 'aws-amplify';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import Constants from 'expo-constants';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
// import config from '../../aws-exports';
//
// const url = config.aws_appsync_graphqlEndpoint;
// const region = config.aws_appsync_region;
//
// const auth: AuthOptions = {
//   type: config.aws_appsync_authenticationType as 'AMAZON_COGNITO_USER_POOLS',
//   jwtToken: async () => {
//     const session = await Auth.currentSession();
//     return session.getIdToken().getJwtToken();
//   }, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
//   // credentials: async () => credentials, // Required when you use IAM-based auth.
// };
//
const httpLink = new HttpLink({
  uri: Constants!.expoConfig!.extra!.graphqlUrl,
});
// const link: ApolloLink = ApolloLink.from([
//   createAuthLink({ url, region, auth }),
//   createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
// ]);
export const apolloClient = new ApolloClient({
  // link,
  uri: "https://craftpile-app.azurewebsites.net/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      ChildUnsortedPhotos: {
        fields: {
          photos: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
      PhotosForAlbum: {
        fields: {
          photos: {
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
      AddChild: {
        merge: true,
      },
      DeleteChild: {
        merge: true,
      },
    },
  }),
});
