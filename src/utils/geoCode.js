const request = require('request')

const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWFya3VzMDciLCJhIjoiY2tkZGFqenRwMGE5NjJ4bnJmMGx5aWRzYSJ9.07YlxLJfGvJqP7hUMCib1g&limit=1"

    request(
        {
            url,
            json: true
        },
        (error, { body }) => {
            if (body.features.length === 0) {
                callback('Invalid Location or Location Not Found!',)
            } else {
                const data = {
                    location: body.features[0].place_name,
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0]
                }
                callback(undefined, data)
            }
        }
    )
}

module.exports = geoCode