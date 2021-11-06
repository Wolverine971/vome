import { IResolvers } from "graphql-tools";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const User = mongoose.model(
  "User",
  new Schema({
    id: String!,
    name: String,
    email: String,
    serviceEntry: String,
    serviceDepart: String,
    dateCreated: Date,
    dateModified: Date,
  })
);

export const Resolvers: IResolvers = {
  Date: String,
  Map: Object,

  Query: {
    user: () => User.find(),

    deleteAllUsers: async () => {
      await User.deleteMany({});
      return true;
    },
  },

  Mutation: {
    addUser: async (_, { name, email, serviceEntry, serviceDepart, type }) => {
      const u = new User({
        name,
        email,
        serviceEntry,
        serviceDepart,
      });
      await u.save();

      return u;
    },
  },
};
