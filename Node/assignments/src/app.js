const express = require('express');
const path = require('path');
const hbs = require('hbs');

const userRouter = require('./routes/index');

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
app.use(userRouter);

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});