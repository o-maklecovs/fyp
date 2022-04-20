const express = require('express');
const router = express.Router();
const validator = require('validator');
const Job = require('../models/job');
const Employer = require('../models/employer');

router.get('/', async (req, res) => {
    const db = res.locals.db;
    
    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        res.render('job_form', {
            title: 'myJobs - Create job posting',
            heading: 'Create job posting',
            action: '/create',
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

        if (validator.isEmpty(req.body.title, { ignore_whitespace: true })) {
            errors.title = 'Please add a title';
        }
        if (validator.isEmpty(req.body.description, { ignore_whitespace: true })) {
            errors.description = 'Please add a description';
        }
        if (validator.isEmpty(req.body.city, { ignore_whitespace: true })) {
            errors.city = 'Please add a city';
        }

        if (Object.keys(errors).length === 0) {
            const employer = await Employer.getEmployerByEmail(res.locals.isLoggedIn.email, db);
            const details = {
                employer_id: employer.getDetails().id,
                title: req.body.title,
                description: req.body.description,
                city: req.body.city,
                date: new Date().toISOString()
            };
            const job = new Job(details, db);
            const result = await job.create();
            res.redirect(`/job?id=${result.insertId}`);
        } else {
            res.render('job_form', {
                title: 'myJobs - Create job posting',
                heading: 'Create job posting',
                action: '/create',
                is_logged_in: res.locals.isLoggedIn,
                is_employer: res.locals.isEmployer,
                errs: errors
            });
        }
    } else {
        res.redirect('/login');
    }

    db.disconnect();
});

module.exports = router;