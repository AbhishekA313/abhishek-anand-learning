const express = require('express');
const path = require('path');
const hbs = require('hbs');
const weather = require('./utils/forecast');

const app = express();

/**
 * Define paths for express config
 */
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

/**
 * Setup handlebars engine and views location
 */
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


/**
 * Setup static directory to serve
 */
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abhishek Anand'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abhishek Anand'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abhishek Anand'
    });
});

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({
            error: 'You must provide a address!'
        });
    }

    weather.forecast(address, (error) => {
        if (error) {
            return res.send({ error });
        }

        res.send({
            forecast: forecastData
        });
    });
});

app.get('/products', (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.send({
            error: 'You must provide a search term!'
        });
    }
    
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhishek Anand',
        errorMessage: 'Help article not found!!'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhishek Anand',
        errorMessage: '404, Page Not Found!'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});