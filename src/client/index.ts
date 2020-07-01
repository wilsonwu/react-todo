import ApolloClient from 'apollo-boost';

import { getToken } from '../context';


const client = new ApolloClient({
  //should be moved to .env
  uri: 'http://localhost:4000/graphql',
  request: (operation) => {
    const token = getToken();
    operation.setContext({
      headers: {
        authorization: token,
      }
    })
  }
});

export default client;