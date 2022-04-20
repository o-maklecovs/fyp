const express = require('express');
const router = express.Router();
const Seeker = require('../models/seeker');

router.get('/', async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && !res.locals.isEmployer) {
        const seeker = await Seeker.getSeekerByEmail(res.locals.isLoggedIn.email, db);
        const jobObjs = await seeker.getFavourites();
        const jobs = [];

        jobObjs.forEach(job => {
            jobs.push(job.getDetails());
        });
        
        res.render('saved', {
            title: 'myJobs - Saved jobs',
            links: [
                { link: '/saved', text: 'Saved jobs' },
                { link: '/applied', text: 'Applied jobs' }
            ],
            jobs,
            is_logged_in: res.locals.isLoggedIn,
            is_employer: res.locals.isEmployer
        });
    } else {
        res.redirect('/login');
    }
    
    db.disconnect();
});

module.exports = router;