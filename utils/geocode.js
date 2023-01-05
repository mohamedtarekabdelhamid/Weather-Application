const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.maptiler.com/geocoding/${address}.json?key=4ve89eWfg52NFwpE0QVe`

    request({url, json: true}, (err, res) => {
        if (err) {
            return callback('Sorry, There is no connection', undefined)
        }
        if (res.body.features.length === 0) {
            return callback('No match result', undefined)
        }

        const lat = res.body.features[0].geometry.coordinates[1]
        const lon = res.body.features[0].geometry.coordinates[0]
        const loc = res.body.features[0].place_name

        callback(undefined, {
            lat,
            lon,
            loc,
        })
    })
}

module.exports = geocode