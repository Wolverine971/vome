# vome

Vome is web application designed to connect veterans in need with useful resources. Veterans or someone providing assistance to a veteran can use the map based interface to look for available services and volunteers in their area. The application also allows people interested in helping veterans to register with the application. Helpers are asked to submit a service or skill that they are willing to provide. Once registered, veterans will be able to find helpers using the map based interface. This application is still in development with many more features planned! 

## Installation
This applications requires Mongodb and Nodejs. For instructions on running a mongodb database locally, go here:
https://docs.mongodb.com/guides/server/install/
To download nodejs, go here:
https://nodejs.org/en/download/

Local installation steps:
1. Clone the repo
$ git clone https://github.com/Wolverine971/vome.git
2. CD into the vome folder
cd vome
3. Install the react app
$ npm install
4. Run the app.  
$ npm run start

$ npm run build:dev
$ npm run test

## Usage
Vome's interface is intuitive. Simply scroll around the map to locate services or select a particular state. Zoom in and out of the map using standard zoom controls. There is also an optional drop down menu provided to search for services by a particular state.  

The application implements a graphql api which can be accessed at http://localhost:3001/graphql 
Api queries and mutations are defined in the backend/src/resolvers folder.  

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss your recommendations. 

## License
[MIT](https://choosealicense.com/licenses/mit/)