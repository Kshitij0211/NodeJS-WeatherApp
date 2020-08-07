const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()

//Paths for expressConfig
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partial')

//Setup Views and View Engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (request, response) => {
    response.render('index', {
        title: 'WeatherApp',
        page: 'Home',
        name: 'Kshitij Raj'
    })
})

//Help Page
app.get('/help', (request, response) => {
    response.render('help', {
        name: 'Kshitij Raj',
        page: 'Help',
        title: 'Help Section!'
    })
})

//About Page
app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About Me',
        page: 'About',
        name: 'Kshitij Raj'
    })
})

//Main Weather Page
app.get('/weather', (request, response) => {

    if (!request.query.location)
        return response.send({
            Error: 'No location provided!',
            Msg: 'Please provide a location.'
        })

    geoCode(request.query.location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return response.send({ error })
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return response.send({ error })
            }

            response.send({
                forecast,
                address: request.query.location
            })
        })
    })

})


app.get('/help/*', (request, response) => {
    response.render('error', {
        title: '404',
        name: 'Kshitij Raj',
        errorMessage: 'Help Article Not Found!'
    })
})

app.get('*', (request, response) => {
    response.render('error', {
        title: '404',
        name: 'Kshitij Raj',
        errorMessage: 'Page Not Found!'
    })
})

app.listen(3000, () => {
    console.log("Server Initiated at port no. 3000!")
})