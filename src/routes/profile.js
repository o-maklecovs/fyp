const express = require('express');
const router = express.Router();
const validator = require('validator');
const Seeker = require('../models/seeker');
const BcryptWrapper = require('../models/bcryptWrapper');

router.get('/', async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && !res.locals.isEmployer) {
        const result = await db.getSeekerByEmail(res.locals.isLoggedIn.email);
        const name = `${result[0].first_name} ${result[0].last_name}`;
        const email = result[0].email;

        
        res.render('profile', {
            title: 'myJobs - Profile',
            name_or_company: name,
            email,
            links: [
                { link: '/saved', text: 'Saved jobs' },
                { link: '/applied', text: 'Applied jobs' }
            ],
            action: '/profile',
            is_logged_in: res.locals.isLoggedIn,
            is_employer: res.locals.isEmployer
        });
    } else {
        res.redirect('/login');
    }

    db.disconnect();
});

router.post('/', async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && !res.locals.isEmployer) {
        const errors = {};

        if (!validator.isStrongPassword(req.body.password)) {
            errors.password = 'Password must be at least 8 characters long, include at least one upper case, lower case character, number and a symbol';
        } else if (req.body.password != req.body.confirmpassword) {
            errors.password = 'Please confirm password';
        }

        const result = await db.getSeekerByEmail(res.locals.isLoggedIn.email);

        if (Object.keys(errors).length === 0) {
            const details = {
                id: result[0].id,
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                email: result[0].email,
                password: req.body.password
            };
            const bcryptWrapper = new BcryptWrapper();
            const seeker = new Seeker(details, db);
            seeker.updatePassword(bcryptWrapper);
            res.redirect('/profile');
        } else {
            res.render('profile', {
                title: 'myJobs - Profile',
                name_or_company: `${result[0].first_name} ${result[0].last_name}`,
                email: result[0].email,
                links: [
                    { link: '/saved', text: 'Saved jobs' },
                    { link: '/applied', text: 'Applied jobs' }
                ],
                action: '/profile',
                errs: errors,
                is_logged_in: res.locals.isLoggedIn,
                is_employer: res.locals.isEmployer
            });
        }
    } else {
        res.redirect('/login');
    }

    db.disconnect();
});

module.exports = router;