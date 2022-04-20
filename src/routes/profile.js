const express = require('express');
const router = express.Router();
const validator = require('validator');
const Seeker = require('../models/seeker');
const BcryptWrapper = require('../models/bcryptWrapper');

router.get('/', async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && !res.locals.isEmployer) {
        const seeker = await Seeker.getSeekerByEmail(res.locals.isLoggedIn.email, db);
        const details = seeker.getDetails();
        const name = `${details.first_name} ${details.last_name}`;
        const email = details.email;

        
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

        const seeker = await Seeker.getSeekerByEmail(res.locals.isLoggedIn.email, db);

        if (Object.keys(errors).length === 0) {
            const bcryptWrapper = new BcryptWrapper();
            await seeker.updatePassword(req.body.password, bcryptWrapper);
            res.redirect('/profile');
        } else {
            res.render('profile', {
                title: 'myJobs - Profile',
                name_or_company: `${seeker.getDetails().first_name} ${seeker.getDetails().last_name}`,
                email: seeker.getDetails().email,
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