const express = require('express');
const router = express.Router();
const checkParams = require('../middlewares/checkParams');
const dotenv = require('dotenv');
const Employer = require('../models/employer');
const Job = require('../models/job');

router.get('/', checkParams, async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        const employer = await Employer.getEmployerByEmail(res.locals.isLoggedIn.email, db);
        const job = await Job.getJobById(req.query.job, db);

        if (job.getDetails().employer_id == employer.getDetails().id) {
            const cvResult = await db.getCvByJobAndSeekerId(req.query.job, req.query.seeker);
            const filename = cvResult[0].cv;
            res.sendFile(`${process.env.DOWNLOAD_PATH}/${filename}`);
        } else {
            res.redirect('/applicants');
        }
    } else {
        res.redirect('/login');
    }

    db.disconnect();
});

module.exports = router;