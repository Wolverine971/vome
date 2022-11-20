# vome

Vome is web application designed to connect veterans in need with useful resources. Veterans or someone providing assistance to a veteran can use the map based interface to look for available services and volunteers in their area. The application also allows people interested in helping veterans to register with the application. Helpers are asked to submit a service or skill that they are willing to provide. Once registered, veterans will be able to find helpers using the map based interface. This application is still in development with many more features planned! 

### ToDo


- [x]  <del>Map
- [x]  <del>Ingest VA center data
- [x]  <del>Hosting- Domain- SSL
- [ ]  Graphql endpoints
- [ ]  Hook up veteran service signup graphql endpoint
- [ ]  Host project
## Installation
This applications requires [Mongodb](https://docs.mongodb.com/guides/server/install/) and [Nodejs](https://nodejs.org/en/download/).


### Frontend
1. Install the react app
```bash
cd front-end
$ npm install
```
2. Run the Frontend.  
```bash
$ npm run start
$ npm run build:dev
$ npm run test
```

### Backend
1. Get Graphql Api up and running
```bash
cd backend
$ npm install
```
2. Run the Backend.  
```bash
$ npm run start
$ npm run build:dev
```

### Seed Data in Mongodb
1. Install the react app
```bash
cd backend/seed
```
Need .env file [mapbox api key](https://docs.mapbox.com/help/getting-started/access-tokens/)

GEO_KEY=mapboxApiKkey

2. Seed random Veteran Services in California.  
```bash
$ node seedCaData.js
```
3. Seed locations of VA Centers in the States.  
```bash
$ node seedVaCenters.js
```

## Usage
Vome's interface is intuitive. Simply scroll around the map to locate services or select a particular state. Zoom in and out of the map using standard zoom controls. There is also an optional drop down menu provided to search for services by a particular state.  

The application implements a graphql api which can be accessed at http://localhost:3001/graphql 
Api queries and mutations are defined in the backend/src/resolvers folder.  

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss your recommendations. 

## License
[MIT](https://choosealicense.com/licenses/mit/)