const express = require('express');
const router = express.Router();
const validator = require('validator');
const Job = require('../models/job');

router.get('/', async (req, res) => {
    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        const db = res.locals.db;
        const jobResult = await db.getJobById(req.query.id);
        const employerResult = await db.getEmployerByEmail(res.locals.isLoggedIn.email);

        if (jobResult[0].employer_id == employerResult[0].id) {
            const job = {
                title: jobResult[0].title,
                city: jobResult[0].city,
                description: jobResult[0].description
            };
    
            res.render('job_form', {
                title: 'myJobs - Edit job posting',
                heading: 'Edit job posting',
                action: `/edit?id=${jobResult[0].id}`,
                job,
                is_logged_in: res.locals.isLoggedIn,
                is_employer: res.locals.isEmployer
            });
        } else {
            res.redirect('/profile-employer');
        }
    } else {
        if (res.locals.isLoggedIn) {
            res.redirect('/profile');
        } else {
            res.redirect('/employer');
        }
    }
});

router.post('/', async (req, res) => {
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

        const db = res.locals.db;
        const employerResult = await db.getEmployerByEmail(res.locals.isLoggedIn.email);
        const jobResult = await db.getJobById(req.query.id);
        const details = {
            id: jobResult[0].id,
            employer_id: employerResult[0].id,
            title: req.body.title,
            description: req.body.description,
            city: req.body.city,
            date: jobResult[0].date
        };

        if (Object.keys(errors).length === 0) {
            const job = new Job(details, db);
            await job.update();
            res.redirect(`/job?id=${details.id}`);
        } else {
            res.render('job_form', {
                title: 'myJobs - Edit job posting',
                heading: 'Edit job posting',
                action: `/edit?id=${details.id}`,
                job: details,
                is_logged_in: res.locals.isLoggedIn,
                is_employer: res.locals.isEmployer,
                errs: errors
            });
        }
    } else {
        if (res.locals.isLoggedIn) {
            res.redirect('/profile');
        } else {
            res.redirect('/employer');
        }
    }
});

module.exports = router;