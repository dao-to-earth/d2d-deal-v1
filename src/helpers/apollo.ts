import gql from 'graphql-tag'
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'development' ? `${process.env.GQL_API_DEV}/graphql` : `${process.env.GQL_API_PROD}/graphql`
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    // addTypename: false
  }),
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: 'no-cache'
  //   }
  // },
  // typeDefs: gql`
  //   enum OrderDirection {
  //     asc
  //     desc
  //   }
  // `
})
