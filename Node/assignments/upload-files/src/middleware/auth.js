const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Address = require('../models/address');

const auth = async (req, res, next) => {
    try {
        const token = localStorage.getItem('token');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        const address = await Address.find({ email: user.email });

        if (!user) {
            throw new Error('User does\'t exist.');
        }

        req.token = token;
        req.user = user;
        req.address = address;
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }).select({
            employment: 1,
            _id: 0
        });
        
        req.isLoggedIn = user ? true : false;
        req.isAdmin = user.employment === 'PRIVATE' ? true : false;

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