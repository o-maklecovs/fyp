const express = require('express');
const router = express.Router();
const Job = require('../models/job');

router.get('/', async (req, res) => {
    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        res.render('job_form', {
            title: 'myJobs - Create job posting',
            heading: 'Create job posting',
            action: '/create',
            is_logged_in: res.locals.isLoggedIn,
            is_employer: res.locals.isEmployer
        });
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
        const db = res.locals.db;
        const employerResult = await db.getEmployerByEmail(res.locals.isLoggedIn.email);
        const details = {
            employer_id: employerResult[0].id,
            title: req.body.title,
            description: req.body.description,
            city: req.body.city,
            date: new Date().toISOString()
        };
        const job = new Job(details, db);
        const result = await job.create();

        res.redirect(`/job?id=${result.insertId}`);
    } else {
        if (res.locals.isLoggedIn) {
            res.redirect('/profile');
        } else {
            res.redirect('/employer');
        }
    }
});

module.exports = router;