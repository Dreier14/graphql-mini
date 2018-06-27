import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import  ApolloClient, { gql }  from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    uri: 'http://localhost:3050/graphql',
    
})

// client.query({
//     query: gql`
//      query{
//         people{
//             name
//         }       
//     }
//  `
// }).then(response => 
//     console.log('---------response', response));



ReactDOM.render( 
   <ApolloProvider client={client}> <App /> </ApolloProvider>, document.getElementById('root')
)