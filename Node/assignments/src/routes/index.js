const express = require("express");
const exportUser = require("../controllers/User");
const writeFile = require('../controllers/WriteFile');
const readFile = require('../controllers/ReadFile');

const router = express.Router();

const { OPERATIONS } = require('../utils/constants');

router.get('', (req, res) => {
    res.render('index', {
        title: 'Node Exercise',
        name: 'Abhishek Anand'
    });
});

router.get('/api/calculate', (req, res) => {
    res.render('calculate', {
        title: 'Calculation',
        name: 'Abhishek Anand'
    });
});

router.get('/api/calculate/:operation', (req, res) => {
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

router.get('/downloadExcel', exportUser);
router.get('/writeFile', writeFile);
router.get('/readFile', readFile);

router.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Abhishek Anand',
        errorMessage: '404, Page Not Found!'
    });
});

module.exports = router;