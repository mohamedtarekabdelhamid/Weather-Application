const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
const {response} = require("express");

const app = express()

const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '..', 'public')
const viewsDir = path.join(__dirname, '..', 'templates', 'views')
const partialsDir = path.join(__dirname, '..', 'templates', 'partials')

app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

app.use(express.static(publicDir))

const author = 'Mohamed Tarek'

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        content: 'Weather',
        temp: 24,
        author
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        content: 'Help',
        author
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'You must enter an address'
        })
    }

    geocode(address, (error, {lat, lon, loc} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(lat, lon, loc, (error, response) => {
            if (error) {
                return res.send({error})
            }

            res.send(response)
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        content: 'About Me',
        aboutInfo: 'We are a company.',
        author
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error!',
        content: 'Help article is not found',
        author
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error!',
        content: 'Page is not fount',
        author
    })
})

app.listen(port)