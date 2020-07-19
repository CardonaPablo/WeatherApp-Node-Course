const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
// Variable que almacena la aplicación de express
const app = express()

const port = process.env.PORT || 3000

//Obtenemos las rutas a las carpetas necesarias
//__dirname nos regresa el path del directorio actual
const viewsPath = path.join(__dirname, "../templates/views")
const publicPath = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname, "../templates/partials")

//Usamos app.set para modificar variables de express
app.set('view engine', 'hbs') //Establecer la view engine al módulo hbs (handlebars)
app.set('views', viewsPath) //Establecer el directorio donde se encuentras las views de handlebars
hbs.registerPartials(partialsPath) //Establece la ruta de los parciales

// Establecer el directorio raíz de la aplicación
app.use(express.static(publicPath))

//Manejo de llamadas por url
app.get('',(request, response) => {
// Renderiza una view de handlebars, en el objeto le pasamos los datos a los que podemos acceder
// desde el template
    response.render("index", {
        title: "Weather App",
        name: "Pablo Cardona"
    })
})

app.get('/about',(request, response) => {
    response.render("about", {
        title: "About",
        name: "Pablo Cardona"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
       return res.send({
            error:"Address must be provided"
        })
    }

    //Obtener coordenadas con geocode
    geocode.requestCoordinates(null, req.query.address, (error, latitude, longitude)=> {
        if(error)
           return res.send({
               error:"An error ocurred"
           })
        forecast.requestWeather(null, latitude, longitude, (error, {current, location} = {})=> {
            if(error)
                return res.send({
                    error:"An error ocurred obtaining the forecast"
                })
            res.send({
                forecast: current.weather_descriptions[0],
                location: location.name + ", " + location.region + ", " + location.country,
                address: req.query.address,
                icon: current.weather_icons[0],
                temperature: current.temperature,
                rain_chance: current.precip,
                wind_speed: current.wind_speed
            });
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search)  {
        return res.send({
            error: "You must provide a search array"
        })
    }
    res.send({
        products: []
    });
})

app.get('/help', (request, response) => {
    response.render('help', {
        title: "Help",
        name: "Palo Cardona",
        message:"This is a help page"
    })
})

app.get('/help/*' , (request, response) => {
    response.render('not-found', {
        title: "Page not found",
        name: 'Pablo Cardona',
        errorMessage: "The help page you are looking for does not exist"
    })
})

app.get('*' , (request, response) => {
    response.render('not-found', {
        title: "Page not found",
        name: "Pablo Cardona",
        errorMessage: "The page you are looking for does not exist"
    })
})

// Inicia la app de express en el puerto 3000
app.listen(port, () => {
    console.log("Server listening on port " + port)
});