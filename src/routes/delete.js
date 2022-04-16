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
            const details = {
                id: jobResult[0].id,
                employer_id: jobResult[0].employer_id,
                title: jobResult[0].title,
                description: jobResult[0].description,
                city: jobResult[0].city,
                date: jobResult[0].date,
            };
            const job = new Job(details, db);
            await job.delete();
            res.redirect('/posted');
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

module.exports = router;