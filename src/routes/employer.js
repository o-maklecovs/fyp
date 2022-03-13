const express = require('express');
const router = express.Router();
const BcryptWrapper = require('../models/bcryptWrapper');
const Employer = require('../models/employer');
const Authenticate = require('../models/auth');

router.get('/', (req, res) => {
    if (res.locals.isLoggedIn) {
        res.redirect('/profile-employer');
    } else {
        res.render('login', {
            title: 'myJobs - Employer',
            heading: 'Employer',
            action: '/employer',
            register_link: '/register-employer',
            error: false
        });
    }
});

router.post('/', async (req, res) => {
    if (res.locals.isLoggedIn) {
        res.redirect('/profile-employer');
    } else {
        const db = res.locals.db;
        const bcryptWrapper = new BcryptWrapper();
        const email = req.body.email;
        const pwd = req.body.password;
        const verifyPass = await Employer.verifyPassword(email, pwd, db, bcryptWrapper);
        if (verifyPass) {
            const auth = new Authenticate();
            const token = auth.login(email);
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/profile');
        } else {
            res.render('login', {
                title: 'myJobs - Employer',
                heading: 'Employer',
                action: '/employer',
                register_link: '/register-employer',
                error: 'Incorrect email or password'
            });
        }
    }
});

module.exports = router;