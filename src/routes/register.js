const express = require('express');
const router = express.Router();
const Seeker = require('../models/seeker');
const BcryptWrapper = require('../models/bcryptWrapper');
const Validate = require('../models/validate');
const Authenticate = require('../models/auth');

router.get('/', (req, res) => {
    if (res.locals.isLoggedIn) {
        res.redirect('/profile');
    } else {
        res.render('register', {
            title: 'myJobs - Register',
            heading: 'Register',
            action: '/register',
            is_employer: false,
            errs: false
        });
    }
});

router.post('/', async (req, res) => {
    const errors = {};
    const validate = new Validate();
    if (!validate.validateString(req.body.firstname) && !validate.validateString(req.body.lastname)) {
        errors.strings = 'Please type valid first and last names';
    }
    if (!validate.validateEmail(req.body.email)) {
        errors.email = 'Please type valid email address';
    }
    if (!validate.validatePassword(req.body.password)) {
        errors.password = 'Password must be at least 8 characters long, include at least one upper case, lower case character, number and a symbol';
    } else if (req.body.password != req.body.confirmpassword) {
        errors.password = 'Please confirm password';
    }
    const isRegistered = await res.locals.db.getSeekerByEmail(req.body.email);
    if (isRegistered.length) {
        errors.exists = 'Account with that email already exists';
    }

    if (Object.keys(errors).length === 0) {
        const details = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        };
        const bcryptWrapper = new BcryptWrapper();
        const seeker = new Seeker(details, res.locals.db, bcryptWrapper);
        seeker.create();
        const auth = new Authenticate();
        const token = auth.login(details.email);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/profile');
    } else {
        res.render('register', {
            title: 'myJobs - Register',
            heading: 'Register',
            action: '/register',
            is_employer: false,
            errs: errors
        });
    }
});

module.exports = router;