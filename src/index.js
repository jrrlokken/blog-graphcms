import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import dotenv from 'dotenv';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

dotenv.config();

const apollo_client = new ApolloClient({
  uri: process.env.REACT_APP_GCMS_URL
});

ReactDOM.render(
  <ApolloProvider client={apollo_client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
