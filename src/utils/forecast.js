const request = require('request')

const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=8ceba109a8fd5841f491d39abc9c9cb4&query=" + lat + "," + long

    request(
        {
            url,
            json: true
        },
        (error, { body }) => {
            if (error)
                callback('Unable to connect to WeatherStack!',)
            else if (body.error)
                callback('Invalid Geolocation. Try again!',)
            else
                callback(undefined, ("Current temperature in " + body.location.name + ", " + body.location.region + ", " + body.location.country +
                    " is " + body.current.temperature.toString() + "°C. " + body.current.weather_descriptions[0] +
                    ". Wind Speed is " + body.current.wind_speed.toString() + " kmph and Visibility is " +
                    body.current.visibility.toString() + "%."))
        }
    )
}

module.exports = forecast