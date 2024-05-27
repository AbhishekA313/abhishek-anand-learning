require('./db/mongoose');

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const cors = require('cors');
const userRouter = require('./routers/user');
const productRouter = require('./routers/product');
const commonRouter = require('./routers/common');

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

app.use(express.json());
app.use(cors({
    credentials: true
}));
app.use(function(req, res, next) {
    const token = localStorage.getItem('token');
    res.setHeader('Authorization', `Bearer ${token}`);
    next();
});
app.use(userRouter);
app.use(productRouter);
app.use(commonRouter);

module.exports = app;