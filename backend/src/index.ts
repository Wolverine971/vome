require('dotenv').config()
import { ApolloServer } from "apollo-server-express";
import * as bodyParser from "body-parser";
import cors from "cors";
// https://medium.com/@th.guibert/basic-apollo-express-graphql-api-with-typescript-2ee021dea2c
import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";

import { UserResolvers, UserTypes } from "./resolvers/users";

mongoose.connect("mongodb://localhost:27017/vome", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.set("debug", true);

(async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: [UserTypes],
    resolvers: [UserResolvers],
  });
  app.use(cors());
  app.use(bodyParser.json({ limit: "50mb" }));
  server.applyMiddleware({ app, path: "/graphql" });
  const httpServer = createServer(app);
  httpServer.listen({ port: process.env.PORT ? process.env.PORT : 3001 }, (): void =>
    console.log(
      `\n🚀   GraphQL is now running on http://localhost:${process.env.PORT}/graphql`
    )
  );
})();
