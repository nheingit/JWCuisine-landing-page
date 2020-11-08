import React from 'react';
import ReactDOM, {render} from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Auth0ProviderWithHistory  from './auth0-provider-with-history';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
 
// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
   uri: 'http://localhost:4000/graphql',
   credentials: "include"
});
 

ReactDOM.render(
  <ApolloProvider client={client}>
  <Router>
  <Auth0ProviderWithHistory>
     <App />
  </Auth0ProviderWithHistory>
   </Router>
   </ApolloProvider>,
    
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
