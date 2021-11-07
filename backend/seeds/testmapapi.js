require('dotenv').config();
const mapBoxKey = process.env.GEO_KEY
const mbxClient = require('@mapbox/mapbox-sdk')
const mbxGeocode = require('@mapbox/mapbox-sdk/services/geocoding')
const baseClient = mbxClient({ accessToken: mapBoxKey });
const geoService = mbxGeocode(baseClient);

async function getLatLonState(zip){
    let match = ""
    await geoService.forwardGeocode({
        query: zip,
        limit: 2
      })
        .send()
        .then(response => {
          match = response.body;
    
        });
    let lon = match.features[0].center[0]
    let lat = match.features[0].center[1]
    console.log(lon)
    console.log(lat)
}

getLatLonState("43230")



