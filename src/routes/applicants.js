const express = require('express');
const router = express.Router();
const Employer = require('../models/employer');

router.get('/', async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        const employer = await Employer.getEmployerByEmail(res.locals.isLoggedIn.email, db);
        const applicants = await employer.getApplicants();
        
        res.render('applicants', {
            title: 'myJobs - Applicants',
            links: [
                { link: '/posted', text: 'Posted jobs' },
                { link: '/applicants', text: 'Applicants' }
            ],
            applicants,
            is_logged_in: res.locals.isLoggedIn,
            is_employer: res.locals.isEmployer
        });
    } else {
        res.redirect('/login');
    }

    db.disconnect();
});

module.exports = router;