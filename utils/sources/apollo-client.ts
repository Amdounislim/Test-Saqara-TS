import { ApolloClient, InMemoryCache } from "@apollo/client";

// create instance of ApolloClient
const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
})

export default client;