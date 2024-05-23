const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const LocalStorage = require('node-localstorage').LocalStorage;

const User = require('../models/user');
const Address = require('../models/address');
const { auth } = require('../middleware/auth');
const { sendWelcomeEmail, sendUpdateEmail }  = require('../emails/account');

const router = new express.Router();
localStorage = new LocalStorage('./scratch');

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image.'));
        }

        cb(undefined, true);
    }
});

router.post('/users', upload.single('avatar'), async (req, res) => {
    const user = new User(req.body);

    try {
        const buffer = await sharp(req.file.buffer).resize({
            width: 150,
            height: 150
        }).png().toBuffer();
        user.avatar = buffer;

        await user.save();
        sendWelcomeEmail(user.email, user.firstname);
        res.redirect('/login');
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        localStorage.setItem('token', token);
        res.send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        localStorage.clear();
        res.send('OK');
    } catch (e) {
        res.status(500).send(e);
    }
})

router.post('/users/address/add', auth, async (req, res) => {
    const address = new Address(req.body);

    try {
        address.email = req.user.email;
        await address.save();
        res.send({ address });
    } catch (e) {
        res.status(400).send(e);
    }
})

router.patch('/users/update', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['email'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        sendUpdateEmail(req.user.email, req.user.firstname);
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
})

module.exports = router;