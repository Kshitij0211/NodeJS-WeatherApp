const path = require('path')
const hbs = require('hbs')
const express = require('express')
const weatherForecast = require('./utils/weatherForecast')

const app = express()
const port = process.env.PORT || 3000

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
        helpText: 'This is the help text',
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

    weatherForecast(request.query.location, (error, { forecast, bg } = {}) => {
        if (error) {
            return response.send({ error })
        }

        response.send({
            forecast,
            bg,
            address: request.query.location
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

app.listen(port, () => {
    console.log("Server Initiated at port no." + port + "!")
})