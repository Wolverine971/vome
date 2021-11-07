import { IResolvers } from "graphql-tools";
import { gql } from "apollo-server-express";
const crypto = require("crypto");
import Service from "../../models/service";

export const ServiceResolvers: IResolvers = {
  Date: String,
  Map: Object,

  Query: {
    getAllServices: async (_, { cursorId }) => {
      const cursorParam = cursorId ? `id: { $gt: ${cursorId} }` : null;
      const service = await Service.find({}).limit(10);

      return {
        services: service,
        count: Service.estimatedDocumentCount(),
      };
    },
    getServicesInState: async (_, { state, cursorId }) => {
      const cursorParam = cursorId ? `id: { $gt: ${cursorId} }` : null;
      const services = await Service.find({ state, cursorParam }).limit(100);
      return {
        services: services,
        count: Service.find({ state }).estimatedDocumentCount(),
      };
    },

    getStates: async (_, {}) => {
      const states = await Service.find().distinct("state");
      return states;
    },
    deleteAllServices: async (_, {}) => {
      const states = await Service.deleteMany({});
      return true;
    },
  },

  Mutation: {
    deleteServiceById: async (_, { id }) => {
      const b = await Service.deleteOne({ id });
      if (b) {
        return true;
      } else {
        return false;
      }
    },
  },
};

export const ServiceTypes = gql`
  extend type Query {
    getAllServices(cursorId: String): PaginatedServices
    getServicesInState(state: String, cursorId: String): PaginatedServices
    getStates: [String]
    deleteAllServices: Boolean
  }

  type PaginatedServices {
    services: [Service]
    count: Int
  }
  type Service {
    id: String
    name: String
    category: String
    description: String
    coordinates: [String]
    address: String
    city: String
    state: String
    zipCode: String
    dateCreated: Date
    dateModified: Date
  }

  type States {
    States: [String]
  }

  extend type Mutation {
    deleteServiceById(id: String): Boolean
  }
`;
