import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  link: uploadLink,
  cache: new InMemoryCache(),
  credentials: "include",
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
    },
    query: {
      fetchPolicy: "network-only",
    },
  },
});

module.exports = client;
