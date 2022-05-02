const express = require('express');
const router = express.Router();
const validator = require('validator');
const Seeker = require('../models/seeker');
const BcryptWrapper = require('../models/bcryptWrapper');
const Authenticate = require('../models/auth');

router.get('/', (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn) {
        res.redirect('/profile');
    } else {
        res.render('register', {
            title: 'myJobs - Register',
            heading: 'Register',
            action: '/register',
            errs: false,
            is_logged_in: res.locals.isLoggedIn,
            is_employer: res.locals.isEmployer,
            is_employer_register: false
        });
    }

    db.disconnect();
});

router.post('/', async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn) {
        res.redirect('/profile');
    } else {
        const errors = {};
        
        if (validator.isEmpty(req.body.firstname, { ignore_whitespace: true }) || validator.isEmpty(req.body.lastname, { ignore_whitespace: true })) {
            errors.strings = 'Please type valid first and last names';
        }
        if (!validator.isEmail(req.body.email)) {
            errors.email = 'Please type valid email address';
        }
        if (!validator.isStrongPassword(req.body.password)) {
            errors.password = 'Password must be at least 8 characters long, include at least one upper case, lower case character, number and a symbol';
        } else if (req.body.password != req.body.confirmpassword) {
            errors.password = 'Please confirm password';
        }

        const isRegisteredSeeker = await db.getSeekerByEmail(req.body.email);
        const isRegisteredEmployer = await db.getEmployerByEmail(req.body.email);
        if (isRegisteredSeeker.length || isRegisteredEmployer.length) {
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
            const seeker = new Seeker(details, db);
            await seeker.create(bcryptWrapper);
            const auth = new Authenticate();
            const token = auth.login(details.email);
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/profile');
        } else {
            res.render('register', {
                title: 'myJobs - Register',
                heading: 'Register',
                action: '/register',
                errs: errors,
                is_logged_in: res.locals.isLoggedIn,
                is_employer: res.locals.isEmployer,
                is_employer_register: false
            });
        }
    }

    db.disconnect();
});

module.exports = router;