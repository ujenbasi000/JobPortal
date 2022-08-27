const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
require("dotenv").config();
const CookieParser = require("cookie-parser");
const { graphqlUploadExpress } = require("graphql-upload");

const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");

require("./config/db")(); // database connection

// CORS configuration
const corsOptions = {
  origin: true,
  credentials: true,
};

async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      return { req, res };
    },
  });

  await server.start();
  app.use(CookieParser());
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app, cors: corsOptions });

  await new Promise((resolve) => app.listen({ port: 5000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);

module.exports = {
  api: {
    bodyParser: false,
  },
};
