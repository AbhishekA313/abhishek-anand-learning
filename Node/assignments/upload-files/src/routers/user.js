const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const LocalStorage = require('node-localstorage').LocalStorage;

const User = require('../models/user');
const { auth } = require('../middleware/auth');
const { sendWelcomeEmail }  = require('../emails/account');

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

const _upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        console.log(file, "11111111111")
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image.'));
        }

        cb(undefined, true);
    }
});

router.post('/users/me/avatar', auth, _upload.single('avatar'), async (req, res) => {
    console.log(req, "_______")
    res.send(`File uploaded successfully.`);
    return;
    try {
        const buffer = await sharp(req.file.buffer).resize({
            width: 90,
            height: 90
        }).png().toBuffer();

        req.user.avatar = buffer;
        await req.user.save();

        res.send(`File uploaded successfully.`);
    } catch (e) {
        res.status(400).send(e);
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(400).send(e);
    }
})

module.exports = router;