import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';

const httpLink = createHttpLink({
  uri: Constants!.expoConfig!.extra!.graphqlUrl,
});

const authLink = setContext(async (_, { headers }) => {
  // get token from secrure storage
  const token = await SecureStore.getItemAsync('authToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
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
