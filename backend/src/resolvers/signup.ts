import { IResolvers } from "graphql-tools";
import { gql } from "apollo-server-express";
const crypto = require("crypto");
import { User } from "./users";
// import { Service } from "./service"
import axios from "axios";
import Service from "../../models/service";


export const SignUpResolvers: IResolvers = {
  Date: String,
  Map: Object,

  Query: {
  },

  Mutation: {
      signUp: async (_, { firstName, lastName, address, city, state, zipCode, serviceName, category, description }) => {

        let resp: any = await axios.post(`http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.GEOCODING_KEY}`,{
            location: `${address}, ${city}, ${state}, ${zipCode}`
        })
        if (resp && resp.data && resp.data.results[0]){

            let results = resp.data.results[0].locations[0]

            const service = new Service({
                name: serviceName,
                category,
                description,
                coordinates: [results.latLng.lat, results.latLng.lng],
                address,
                city,
                state,
                zipCode,
                dateCreated: new Date(),
                dateModified: new Date(),

            })
            service.id = service._id;
            const serviceCreated = await service.save();
        
            const u = new User({
                firstName,
                lastName,
                address,
                city,
                state,
                zipCode,
                coordinates: results.latLng,
                dateCreated: new Date(),
                dateModified: new Date(),
            });
            u.id = u._id;
            await u.save();


            return u;
        } else {
            console.log('error finding location')
            return false
        }
      },
  },
};

export const SignUpTypes = gql`

  extend type Mutation {
    signUp(firstName: String, lastName: String, address: String, 
    city: String, state: String, zipCode: String, serviceName: String,
    category: String, description: String): User
  }
`;
