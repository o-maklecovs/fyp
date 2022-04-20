const express = require('express');
const router = express.Router();
const validator = require('validator');
const checkParams = require('../middlewares/checkParams');
const Job = require('../models/job');

router.get('/', checkParams, async (req, res) => {
    const query = req.query.search_query;
    const city = req.query.search_city;
    const db = res.locals.db;
    const jobObjs = await Job.searchJobs(query, city, db);
    const jobs = [];
    jobObjs.forEach(job => {
        jobs.push(job.getDetails());
    });
    
    res.render('list', {
        title: 'myJobs - Jobs in your area',
        jobs,
        is_logged_in: res.locals.isLoggedIn,
        is_employer: res.locals.isEmployer
    });

    db.disconnect();
});

module.exports = router;