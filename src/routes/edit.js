const express = require('express');
const router = express.Router();
const validator = require('validator');
const Job = require('../models/job');
const Employer = require('../models/employer');
const checkParams = require('../middlewares/checkParams');

router.get('/', checkParams, async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        const job = await Job.getJobById(req.query.id, db);
        const employer = await Employer.getEmployerByEmail(res.locals.isLoggedIn.email, db);

        if (job.getDetails().employer_id == employer.getDetails().id) {
            res.render('job_form', {
                title: 'myJobs - Edit job posting',
                heading: 'Edit job posting',
                action: `/edit?id=${job.getDetails().id}`,
                job: job.getDetails(),
                is_logged_in: res.locals.isLoggedIn,
                is_employer: res.locals.isEmployer
            });
        } else {
            res.redirect(`/job?id=${req.query.id}`);
        }
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

        const employer = await Employer.getEmployerByEmail(res.locals.isLoggedIn.email, db);
        const job = await Job.getJobById(req.query.id, db);

        if (job.getDetails().employer_id == employer.getDetails().id) {
            const newDetails = {
                id: job.getDetails().id,
                employer_id: employer.getDetails().id,
                title: req.body.title,
                description: req.body.description,
                city: req.body.city,
                date: job.getDetails().date
            };
    
            if (Object.keys(errors).length === 0) {
                await job.update(newDetails);
                res.redirect(`/job?id=${newDetails.id}`);
            } else {
                res.render('job_form', {
                    title: 'myJobs - Edit job posting',
                    heading: 'Edit job posting',
                    action: `/edit?id=${newDetails.id}`,
                    job: newDetails,
                    is_logged_in: res.locals.isLoggedIn,
                    is_employer: res.locals.isEmployer,
                    errs: errors
                });
            }
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

    db.disconnect();
});

module.exports = router;