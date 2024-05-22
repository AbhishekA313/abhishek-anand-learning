const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = localStorage.getItem('token');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error('User does\'t exist.');
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).render('error', {
            title: 'Register User',
            error: 'Please authenticate.'
        });
    }
}

const isLoggedIn = async (req, res, next) => {
    try {
        const token = localStorage.getItem('token');
        req.isLoggedIn = token ? true : false;
        next();
    } catch (e) {
        res.status(401).render('error', {
            title: 'Register User',
            error: 'Please authenticate.'
        });
    }
}

module.exports = {
    auth,
    isLoggedIn
};