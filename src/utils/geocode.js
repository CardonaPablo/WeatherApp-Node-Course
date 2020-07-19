const request  = require("postman-request");

const requestCoordinates = (error, location, callback) => {
    const mapboxBaseURL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
    let mapboxAccessToken = "pk.eyJ1IjoiY2FyZG9uYXBhYmxvIiwiYSI6ImNrY3FqZnM4bTBoMGcyeXBnc3E1NjhnN3gifQ.DjdrlJygeoLXZVMXYAJoVA";
    let mapboxURL = mapboxBaseURL + '/' + encodeURIComponent(location) + '.json?access_token=' + mapboxAccessToken + '&limit=1&language=es';
    if(error)
        return callback(error)
    request({
        url: mapboxURL,
        json: true
    }, (error, response) => {
        
        if(error)
            return callback(error)
        if(response.body.features.length == 0)
            return callback("Sin resultados de búsqueda")
        callback(null, response.body.features[0].center[1], response.body.features[0].center[0])
    })
}

module.exports = {
    requestCoordinates
}