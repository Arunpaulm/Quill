import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import { baseURL } from './components/common/common';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://quill-ca113-sd7tjm4hyq-nw.a.run.app/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient
({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
