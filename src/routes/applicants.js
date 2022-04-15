const express = require('express');
const router = express.Router();
const Employer = require('../models/employer');

router.get('/', async (req, res) => {
    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        const db = res.locals.db;
        const result = await db.getEmployerByEmail(res.locals.isLoggedIn.email);
        const employer = new Employer(result[0], db);
        const applicants = await employer.getApplicants();

        for (let i = 0; i < applicants.length; i++) {
            const date = new Date(applicants[i].date);
            const formattedDate = `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            applicants[i].date = formattedDate;
            applicants[i].company_name = result[0].company_name;
        }

        db.disconnect();

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
        if (res.locals.isLoggedIn) {
            res.redirect('/profile');
        } else {
            res.redirect('/employer');
        }
    }
});

module.exports = router;