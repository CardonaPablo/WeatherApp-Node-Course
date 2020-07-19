const request  = require("postman-request");

const requestWeather = (error, latitude, longitude, callback) => {
    //Request para el clima
    const baseURL = "http://api.weatherstack.com";
    const APIKey = "d854da458b6f40ae9fbea8e459c07586";
    const coordinates = latitude + ',' + longitude;
    const url = baseURL + '/current?access_key='+APIKey+'&query=' + coordinates;
    if(error)
        return callback(error)
    request({
        url,
        json: true
    }, (error, response) => {
        const data = response.body;
        if(error)
            return callback(error)
        callback(null, data);
    })
}

module.exports = {
    requestWeather
}