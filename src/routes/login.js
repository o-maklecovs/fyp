const express = require('express');
const router = express.Router();
const Authenticate = require('../models/auth');
const Seeker = require('../models/seeker');
const BcryptWrapper = require('../models/bcryptWrapper');

router.get('/', async (req, res) => {
    if (res.locals.isLoggedIn) {
        res.redirect('/profile');
    } else {
        res.render('login', {
            title: 'myJobs - Login',
            heading: 'Login',
            action: '/login',
            register_link: '/register',
            error: ''
        });
    }
});

router.post('/', async (req, res) => {
    if (res.locals.isLoggedIn) {
        res.redirect('/profile');
    } else {
        const db = res.locals.db;
        const bcryptWrapper = new BcryptWrapper();
        const email = req.body.email;
        const pwd = req.body.password;
        const verifyPass = await Seeker.verifyPassword(email, pwd, db, bcryptWrapper);
        if (verifyPass) {
            const auth = new Authenticate();
            const token = auth.login(email);
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/profile');
        } else {
            res.render('login', {
                title: 'myJobs - Login',
                heading: 'Login',
                action: '/login',
                register_link: '/register',
                error: 'Incorrect email or password'
            });
        }
    }
});

module.exports = router;