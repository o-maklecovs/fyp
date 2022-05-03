const express = require('express');
const router = express.Router();
const checkParams = require('../middlewares/checkParams');
const Job = require('../models/job');
const Employer = require('../models/employer');
const Seeker = require('../models/seeker');

router.get('/', checkParams, async (req, res) => {
    const id = req.query.id;
    const db = res.locals.db;
    const jobObj = await Job.getJobById(id, db);
    const job = jobObj.getDetails();
    const employer = await Employer.getEmployerById(jobObj.getDetails().employer_id, db);
    job.company_name = employer.getDetails().company_name;

    let isCorrectEmployer = false;
    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        const employerObj = await Employer.getEmployerByEmail(res.locals.isLoggedIn.email, db);
        if (employerObj.getDetails().id == job.employer_id) {
            isCorrectEmployer = true;
        }
    }

    let isSaved = false;
    if (res.locals.isLoggedIn && !res.locals.isEmployer) {
        const seeker = await Seeker.getSeekerByEmail(res.locals.isLoggedIn.email, db);
        isSaved = await seeker.isJobSaved(job.id);
    }

    res.render('job', {
            title: 'myJobs - View job ad',
            job,
            is_logged_in: res.locals.isLoggedIn,
            is_employer: res.locals.isEmployer,
            is_correct_employer: isCorrectEmployer,
            is_saved: isSaved,
            action: `/apply?id=${req.query.id}`
    });

    db.disconnect();
});

module.exports = router;