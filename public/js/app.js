
const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
weatherForm.addEventListener("submit", (e)=>{
    //Previene que se recargue la página en el submit
    e.preventDefault();

    const location = search.value
    fetch("/weather?address=" + encodeURI(location))
        .then((response) => {
            document.getElementById("error-message").innerHTML = "";
            document.getElementById("weather-icon").src = "";
            document.getElementById("forecast").innerHTML = "";
            document.getElementById("location").innerHTML  = "";
            document.getElementById("temperature").innerHTML = "";
            document.getElementById("rain").innerHTML = "";
            document.getElementById("wind").innerHTML = "";
            console.log("Aqui ando")
            response.json().then(({error, forecast, location, icon, temperature, rain_chance:rain, wind_speed: wind}) => {
                if(error) 
                    document.getElementById("error-message").innerHTML = error;
                else {
                    document.getElementById("weather-icon").src = icon;
                    document.getElementById("forecast").innerHTML = "Forecast <br> " + forecast
                    document.getElementById("location").innerHTML  = "Location <br> " + location
                    document.getElementById("temperature").innerHTML = "Temperature <br> " + temperature
                    document.getElementById("rain").innerHTML = "Rain chance <br> " + rain + "%"
                    document.getElementById("wind").innerHTML = "Wind Speed <br> " + wind + "km/h"
                }
            })
        }).catch((err) => {
            console.error(err);
        });
})
console.log(weatherForm)

