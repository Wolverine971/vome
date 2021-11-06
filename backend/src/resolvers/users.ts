import { IResolvers } from "graphql-tools";
import { gql } from "apollo-server-express";
import mongoose from "mongoose";
const crypto = require("crypto");

const Schema = mongoose.Schema;

export const User = mongoose.model(
  "User",
  new Schema({
    id: String!,
    firstName: String,
    lastName: String,
    email: String!,
    password: String!,
    tokenVersion: Number,
    confirmedUser: Boolean,
    confirmationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    role: String,
    dateCreated: Date,
    dateModified: Date,
  })
);

export const Admin = mongoose.model(
  "Admin",
  new Schema({
    id: String,
    role: String,
    dateCreated: Date,
    dateModified: Date,
  })
);

export const UserResolvers: IResolvers = {
  Date: String,
  Map: Object,

  Query: {
    users: async (_, { cursorId }) => {
      const cursorParam = cursorId ? `id: { $gt: ${cursorId} }` : null;
      const u = await User.find({ cursorParam }).limit(10);

      return {
        users: u,
        count: User.estimatedDocumentCount(),
      };
    },

    getUserByEmail: async (_, { email }) => {
      const u = await User.findOne({ email });
      return u;
    },
    getUserById: async (_, { id }) => {
      const u = await User.findOne({ id });
      return u;
    },
    deleteUsers: async () => {
      await User.deleteMany({});
      return true;
    },

    deleteUsersByEmail: async (_, { email }) => {
      const u = await User.deleteOne({ email });
      return true;
    },
    getAdmins: async () => await Admin.find(),
  },

  Mutation: {
    createUser: async (_, { email, password }) => {
      const u = new User({
        email,
        password,
        tokenVersion: 0,
        confirmedUser: false,
        confirmationToken: crypto.randomBytes(20).toString("hex"),
        resetPasswordToken: null,
        resetPasswordExpires: null,
        role: "user",
        dateCreated: new Date(),
        dateModified: new Date(),
      });
      u.id = u._id;
      await u.save();
      return u;
    },

    confirmUser: async (_, { confirmationToken }) => {
      const u = await User.findOneAndUpdate(
        {
          confirmationToken,
        },
        {
          confirmedUser: true,
        }
      );
      if (u) {
        return true;
      } else {
        return false;
      }
    },

    updateUser: async (
      _,
      { id, firstName, lastName, email }
    ) => {
      const u = User.findOneAndUpdate(
        { id },
        {
          firstName,
          lastName,
          email,
          resetPasswordToken: null,
          resetPasswordExpires: null,
          dateModified: new Date(),
        }
      );
      return u;
    },

    revokeRefreshTokensForUser: async (_, { email }) => {
      await User.updateOne({ email }, { $inc: { tokenVersion: 1 } });
      return true;
    },
    recover: async (_, { email }) => {
      const userExists = await User.findOne({ email });
      if (userExists) {
        const u = await User.updateOne(
          { email },
          {
            $inc: { tokenVersion: 1 },
            resetPasswordToken: crypto.randomBytes(20).toString("hex"),
            resetPasswordExpires: Date.now() + 3600000,
          }
        );
        const updatedUser = await User.findOne({ email });
        if (u) {
          return updatedUser;
        } else {
          return null;
        }
      } else {
        return "user doesnt exits";
      }
    },

    reset: async (_, { resetPasswordToken }) => {
      const u = await User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() },
      });
      return u;
    },
    resetPassword: async (_, { password, resetPasswordToken }) => {
      const u = await User.findOneAndUpdate(
        {
          resetPasswordToken,
          resetPasswordExpires: { $gt: Date.now() },
          confirmedUser: true
        },
        {
          password,
        }
      );
      if (u) {
        return u.save();
      } else {
        return null;
      }
    },

    deleteUser: async (_, { email }) => {
      await User.deleteOne({ email });
      return true;
    },

    changeUser: async (_, { id, id2, tag }) => {
      let user = await Admin.findOne({ id, role: "admin" });
      if (user) {
        const u = await User.findOneAndUpdate(
          { email: id2 },
          { role: tag, dateModified: new Date() }
        );
        if (u) {
          u.save();
          const a = await Admin.findOne({ id: id2 });
          if (a) {
            const updated = await Admin.findOneAndUpdate(
              { id: id2 },
              { role: tag, dateModified: new Date() }
            );
            return true;
          } else {
            const admin = new Admin({
              id: id2,
              role: tag,
              dateModified: new Date(),
              dateCreated: new Date(),
            });
            await admin.save();
            return true;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
};

export const UserTypes = gql`
  scalar Date
  scalar Map
  type Query {
    users(cursorId: String): PaginatedUsers
    getUserByEmail(email: String!): User
    getUserById(id: String!): User
    deleteUsers: Boolean
    deleteUsersByEmail(email: String!): Boolean
    getAdmins: [Admin]
  }
  type PaginatedUsers {
    users: [User]
    count: Int
  }

  type User {
    id: String
    firstName: String
    lastName: String
    password: String
    email: String
    tokenVersion: Int
    confirmedUser: Boolean
    confirmationToken: String
    resetPasswordToken: String
    resetPasswordExpires: Date
    role: String
    dateCreated: Date
    dateModified: Date
  }

  type Admin {
    id: String
    role: String
    dateCreated: Date
    dateModified: Date
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    confirmUser(confirmationToken: String!): Boolean!

    updateUser(
      id: String!
      firstName: String
      lastName: String
      email: String
    ): User!

    revokeRefreshTokensForUser(email: String): Boolean
    recover(email: String): User
    reset(resetPasswordToken: String!): User
    resetPassword(password: String!, resetPasswordToken: String!): User

    deleteUser(email: String): Boolean
    changeUser(id: String!, id2: String!, tag: String!): Boolean
    change(id: String!, type: String!, tag: String!): Boolean
  }
`;
