const request = require('request')

const forecast = (lat, lon, loc, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=334933a19d71382344f863bd15ae504e&query=${lat},${lon}`

    request({url, json: true}, (err, res) => {
        if (err) {
            return callback('There is no connection', undefined)
        }
        if (res.body.success === false) {
            return callback('We can\'t find this address', undefined)
        }
        const body = res.body
        const country = body.location.country
        const city = loc
        const temp = body.current.temperature
        const weatherDesc = body.current.weather_descriptions[0]
        const windSpeed = body.current.wind_speed
        const pressure = body.current.pressure
        const humidity = body.current.humidity

        callback(undefined, {
            country,
            city,
            temperature: temp,
            weather_descriptions: weatherDesc,
            wind_speed: windSpeed,
            pressure,
            humidity,
        })
    })
}

module.exports = forecast
