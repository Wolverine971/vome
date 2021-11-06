import { gql } from "apollo-server-express";

export const Types = gql`
  scalar Date
  scalar Map

  type Query {
    user: [User]!
    
    deleteAllUsers: Boolean
  }
  type User {
    id: String!
    name: String
    email: String!
    dateCreated: Date
    dateModified: Date
  }


  type Mutation {
    addUser(
      name: String
      email: String
      serviceEntry: String
      serviceDepart: String
    ): User!
  }
`;
