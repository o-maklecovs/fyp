const express = require('express');
const router = express.Router();
const validator = require('validator');
const Employer = require('../models/employer');
const BcryptWrapper = require('../models/bcryptWrapper');

router.get('/', async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        const employer = await Employer.getEmployerByEmail(res.locals.isLoggedIn.email, db);
        const name = employer.getDetails().company_name;
        const email = employer.getDetails().email;
        
        res.render('profile', {
            title: 'myJobs - Employer profile',
            name_or_company: name,
            email,
            links: [
                { link: '/posted', text: 'Posted jobs' },
                { link: '/applicants', text: 'Applicants' }
            ],
            action: 'profile-employer',
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

    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        const errors = {};

        if (!validator.isStrongPassword(req.body.password)) {
            errors.password = 'Password must be at least 8 characters long, include at least one upper case, lower case character, number and a symbol';
        } else if (req.body.password != req.body.confirmpassword) {
            errors.password = 'Please confirm password';
        }

        const employer = await Employer.getEmployerByEmail(res.locals.isLoggedIn.email, db);

        if (Object.keys(errors).length === 0) {
            const bcryptWrapper = new BcryptWrapper();
            await employer.updatePassword(req.body.password, bcryptWrapper);
            res.redirect('/profile-employer');
        } else {
            res.render('profile', {
                title: 'myJobs - Employer profile',
                name_or_company: employer.getDetails().company_name,
                email: employer.getDetails().email,
                links: [
                    { link: '/posted', text: 'Posted jobs' },
                    { link: '/applicants', text: 'Applicants' }
                ],
                action: '/profile-employer',
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