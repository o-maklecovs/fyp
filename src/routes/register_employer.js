const express = require('express');
const router = express.Router();
const Validate = require('../models/validate');
const BcryptWrapper = require('../models/bcryptWrapper');
const Employer = require('../models/employer');
const Authenticate = require('../models/auth');

router.get('/', (req, res) => {
    if (res.locals.isLoggedIn) {
        res.redirect('/profile-employer');
    } else {
        res.render('register', {
            title: 'myJobs - Register as employer',
            heading: 'Register as employer',
            action: '/register-employer',
            is_employer: true,
            errs: false
        });
    }
});

router.post('/', async (req, res) => {
    const errors = {};
    const validate = new Validate();
    if (!validate.validateString(req.body.companyname)) {
        errors.strings = 'Invalid company name';
    }
    if (!validate.validateEmail(req.body.email)) {
        errors.email = 'Invalid email address';
    }
    if (!validate.validatePassword(req.body.password)) {
        errors.password = 'Password must be at least 8 characters long, include at least one upper case, lower case character, number and a symbol';
    } else if (req.body.password != req.body.confirmpassword) {
        errors.password = 'Please confirm password';
    }
    const isRegistered = await res.locals.db.getEmployerByEmail(req.body.email);
    if (isRegistered.length) {
        errors.exists = 'Account with that email already exists';
    }

    if (Object.keys(errors).length === 0) {
        const details = {
            company: req.body.companyname,
            email: req.body.email,
            password: req.body.password
        };
        const bcryptWrapper = new BcryptWrapper();
        const employer = new Employer(details, res.locals.db, bcryptWrapper);
        employer.create();
        const auth = new Authenticate();
        const token = auth.login(details.email);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/profile-employer');
    } else {
        res.render('register', {
            title: 'myJobs - Register as employer',
            heading: 'Register as employer',
            action: '/register-employer',
            is_employer: true,
            errs: errors
        });
    }
});

module.exports = router;