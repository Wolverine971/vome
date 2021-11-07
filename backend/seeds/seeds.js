require('dotenv').config();
const Service = require('../models/service');
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/vome';
const mapBoxKey = process.env.GEO_KEY
const mbxClient = require('@mapbox/mapbox-sdk')
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding')
const baseClient = mbxClient({ accessToken: mapBoxKey });
const geoService = mbxGeocode(baseClient);
var services = ["Mental Health Counselor","Drug rehabilitation","Physical Therapist","VA claims specialist","Suicide Intervention","Employment Counselor","Mentor","Technical Education","College admissions counselor","VA education benefits counselor"]
var description = ["Helpful service","Helpful service","Helpful service","Helpful service","Helpful service","Helpful service","Helpful service","Helpful service","Helpful service","Helpful service"]
var category = ["Mental Health","Physical Health","Physical Health","Benefits","Mental Health","Employment","Education","Education","Education","Education"]
var cities = ["Los Angeles",
"San Diego",
"San Jose",
"San Francisco",
"Fresno",
"Sacramento",
"Long Beach",
"Oakland",
"Bakersfield",
"Anaheim",
"Santa Ana",
"Riverside",
"Stockton",
"Chula Vista",
"Irvine",
"Fremont",
"San Bernardino",
"Modesto",
"Fontana",
"Oxnard",
"Moreno Valley",
"Huntington Beach",
"Glendale",
"Santa Clarita",
"Garden Grove",
"Oceanside",
"Rancho Cucamonga",
"Santa Rosa",
"Ontario",
"Lancaster",
"Elk Grove",
"Corona",
"Palmdale",
"Salinas",
"Pomona",
"Hayward",
"Escondido",
"Torrance",
"Sunnyvale",
"Orange",
"Fullerton",
"Pasadena",
"Thousand Oaks",
"Visalia",
"Simi Valley",
"Concord",
"Roseville",
"Victorville",
"Santa Clara",
"Vallejo",
"Berkeley",
"El Monte",
"Downey",
"Costa Mesa",
"Inglewood",
"Carlsbad",
"San Buenaventura (Ventura)",
"Fairfield",
"West Covina",
"Murrieta",
"Richmond",
"Norwalk",
"Antioch",
"Temecula",
"Burbank",
"Daly City",
"Rialto",
"Santa Maria",
"El Cajon",
"San Mateo",
"Clovis",
"Compton",
"Jurupa Valley",
"Vista",
"South Gate",
"Mission Viejo",
"Vacaville",
"Carson",
"Hesperia",
"Santa Monica",
"Westminster",
"Redding",
"Santa Barbara",
"Chico",
"Newport Beach",
"San Leandro",
"San Marcos",
"Whittier",
"Hawthorne",
"Citrus Heights",
"Tracy",
"Alhambra",
"Livermore",
"Buena Park",
"Menifee",
"Hemet",
"Lakewood",
"Merced",
"Chino",
"Indio",
"Redwood City",
"Lake Forest",
"Napa",
"Tustin",
"Bellflower",
"Mountain View",
"Chino Hills",
"Baldwin Park",
"Alameda",
"Upland",
"San Ramon",
"Folsom",
"Pleasanton",
"Union City",
"Perris",
"Manteca",
"Lynwood",
"Apple Valley",
"Redlands",
"Turlock",
"Milpitas",
"Redondo Beach",
"Rancho Cordova",
"Yorba Linda",
"Palo Alto",
"Davis",
"Camarillo",
"Walnut Creek",
"Pittsburg",
"South San Francisco",
"Yuba City",
"San Clemente",
"Laguna Niguel",
"Pico Rivera",
"Montebello",
"Lodi",
"Madera",
"Santa Cruz",
"La Habra",
"Encinitas",
"Monterey Park",
"Tulare",
"Cupertino",
"Gardena",
"National City",
"Rocklin",
"Petaluma",
"Huntington Park",
"San Rafael",
"La Mesa",
"Arcadia",
"Fountain Valley",
"Diamond Bar",
"Woodland",
"Santee",
"Lake Elsinore",
"Porterville",
"Paramount",
"Eastvale",
"Rosemead",
"Hanford",
"Highland",
"Brentwood",
"Novato",
"Colton",
"Cathedral City",
"Delano",
"Yucaipa",
"Watsonville",
"Placentia",
"Glendora",
"Gilroy",
"Palm Desert",
"Cerritos",
"West Sacramento",
"Aliso Viejo",
"Poway",
"La Mirada",
"Rancho Santa Margarita",
"Cypress",
"Dublin",
"Covina",
"Azusa",
"Palm Springs",
"San Luis Obispo",
"Ceres",
"San Jacinto",
"Lincoln",
"Newark",
"Lompoc",
"El Centro",
"Danville",
"Bell Gardens",
"Coachella",
"Rancho Palos Verdes",
"San Bruno",
"Rohnert Park",
"Brea",
"La Puente",
"Campbell",
"San Gabriel",
"Beaumont",
"Morgan Hill",
"Culver City",
"Calexico",
"Stanton",
"La Quinta",
"Pacifica",
"Montclair",
"Oakley",
"Monrovia",
"Los Banos",
"Martinez"]

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
    //await Service.deleteMany({}); Uncomment to erase previously seaded data 
    
    for (let i=0; i<50; i++){ 
        let cityIndex = Math.floor((Math.random())*cities.length)  
        let serviceIndex = Math.floor((Math.random())*services.length)
        let city = cities[cityIndex]
        let latlon = await getLatLon(city)
        let lon = latlon[0]
        let lat = latlon[1]   
        let service = new Service({
            name: services[serviceIndex],
            category: category[serviceIndex],
            description: description[serviceIndex],
            coordinates: [lat, lon],
            address: "",
            city: cities[cityIndex],
            state: "California",
            zipCode: "",
            dateCreated: new Date(),
            dateModified: new Date(),
        });
        await service.save();
    }
}

async function getLatLon(city){
    let match = ""
    await geoService.forwardGeocode({
        query: `${city}, California`,
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


