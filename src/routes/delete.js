const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const Employer = require('../models/employer');
const checkParams = require('../middlewares/checkParams');

router.get('/', checkParams, async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        const job = await Job.getJobById(req.query.id, db);
        const employer = await Employer.getEmployerByEmail(res.locals.isLoggedIn.email, db);

        if (job.getDetails().employer_id == employer.getDetails().id) {
            await job.delete();
            res.redirect('/posted');
        } else {
            res.redirect('/posted');
        }
    } else {
        res.redirect('/login');
    }

    db.disconnect();
});

module.exports = router;