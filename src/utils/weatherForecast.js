const request = require('request')

const weatherForecast = (address, callback) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(address) + "&appid=5ad55109da2d2bffa4290628ad7b8426&units=metric"
    //+ encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWFya3VzMDciLCJhIjoiY2tkZGFqenRwMGE5NjJ4bnJmMGx5aWRzYSJ9.07YlxLJfGvJqP7hUMCib1g&limit=1"

    request(
        {
            url,
            json: true
        },
        (error, { body }) => {
            if (body.cod === "404") {
                callback('Invalid Location.',)
            }
            else {

                const data = {
                    forecast: "It is  at " + body.name + ", " + body.sys.country +
                        ". Current temperature is " + body.main.temp + "°C. Feels like " + body.main.feels_like +
                        "°C. Humidity is " + body.main.humidity + "% with wind speed of " + body.wind.speed + " kmph",
                    bg: body.weather[0].main.toLowerCase()
                }
                callback(undefined, data)
            }
        }
    )
}

module.exports = weatherForecast