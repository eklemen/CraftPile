import { registerRootComponent } from 'expo';

import Main from './src/Main';
import { apolloClient } from './src/apolloConfig';
import { ApolloProvider } from '@apollo/client';

const App = () => (
  <ApolloProvider client={apolloClient}><Main /></ApolloProvider>
    );

export default App;
