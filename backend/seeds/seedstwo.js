require('dotenv').config();
const Service = require('../models/service');
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/vome';
const mapBoxKey = process.env.GEO_KEY
const mbxClient = require('@mapbox/mapbox-sdk')
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding')
const baseClient = mbxClient({ accessToken: mapBoxKey });
const geoService = mbxGeocode(baseClient);
const vamedcenters = require('./vamedcenters')
const {stateAbbreviations,stateNames} = require('./states')

const stateAbreviations ={
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected');
})


const seedDB = async () => {
     //await Service.deleteMany({}); 
    for (let i=0; i<vamedcenters.length; i++){
        //name
        if (vamedcenters[i][12].length == 5){
            //name
            //console.log(vamedcenters[i][8])
            //address
            //console.log(vamedcenters[i][14])
            //city
            //console.log(vamedcenters[i][10])
            //state
            //console.log(vamedcenters[i][11])
            //zip
            //console.log(vamedcenters[i][12])
            let latlon = await getLatLon(vamedcenters[i][12])
            let lon = latlon[0]
            let lat = latlon[1] 
            let stateName = convertStateAbbreviated(vamedcenters[i][11])
            let service = new Service({
                name: vamedcenters[i][8],
                category: "VA Center",
                description: "Veterans administration facility",
                coordinates: [lat,lon],
                address: vamedcenters[i][14],
                city: vamedcenters[i][10],
                state: stateAbreviations[vamedcenters[i][11]],
                zipCode: vamedcenters[i][12],
                dateCreated: new Date(),
                dateModified: new Date(),
            });
            await service.save();
        }
    }
}

async function getLatLon(zip){
    let match = ""
    await geoService.forwardGeocode({
        query: zip,
        limit: 2
      })
        .send()
        .then(response => {
          match = response.body;
    
        });
    return match.features[0].center
}


seedDB().then(() => {
    mongoose.connection.close();
});
