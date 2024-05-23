const express = require('express');
const { auth, isLoggedIn } = require('../middleware/auth');

const router = new express.Router();

router.get('', isLoggedIn, (req, res) => {
    res.render('index', {
        title: 'File Upload System',
        isLoggedIn: req.isLoggedIn,
        isAdmin: req.isAdmin
    });
});

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Register User',
        isLoggedIn: false
    });
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login User',
        isLoggedIn: false
    });
});

router.get('/my-account', auth, (req, res) => {
    const  imageUrl = `data:image/jpeg;base64,${req.user.avatar.toString('base64')}`;
    
    res.render('myAccount', {
        title: 'My Account',
        user: req.user,
        addresses: req.address,
        imageUrl,
        isLoggedIn: true
    });
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found!'
    });
});

module.exports = router;