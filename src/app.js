const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Maksym',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Maksym',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Maksym',
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Maksym',
        errorMessage: 'Help article is not found',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'You must provide an adress term'
        });
    }

    console.log('req.query', req.query);

    geocode(req.query.adress, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log('req.query', req.query);

    res.send({
        products: [],
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Maksym',
        errorMessage: 'Page not found',
    });
});

app.listen(port, () => {
    console.log(`The server is listening in ${port}`);
});