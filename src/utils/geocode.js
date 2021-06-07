
const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaW1yYW4taXNtYWlsIiwiYSI6ImNrZTNlZHMyMDBpa3Yyc3A4cnkyMm04cW4ifQ.a-RqkNdsewUatVTAtLJuXQ&limit=1`

    request({url: url, json: true}, (error, response, body) => {

        if (error) {
            callback("Unable to connect to the weather app!", undefined)
        }else if(response.body.features.length === 0){
            callback("Unable to connect to the location", undefined)
        }else{

            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location:response.body.features[0].place_name
            })    
            
        }
        
        
    })

}

module.exports = geocode