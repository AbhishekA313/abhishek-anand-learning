const express = require('express');
const path = require('path');
const hbs = require('hbs');

const { OPERATIONS } = require('./utils/constants');

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
        title: 'Node Exercise',
        name: 'Abhishek Anand'
    });
});

app.get('/api/calculate', (req, res) => {
    res.render('calculate', {
        title: 'Calculation',
        name: 'Abhishek Anand'
    });
});

app.get('/api/calculate/:operation', (req, res) => {
    const { operation } = req.params;
    const canShowForm = OPERATIONS.includes(operation);

    res.render('calculate', {
        title: 'Calculation',
        name: 'Abhishek Anand',
        operation,
        canShowForm,
        [operation]: true
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