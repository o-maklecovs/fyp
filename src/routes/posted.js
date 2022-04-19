const express = require('express');
const router = express.Router();
const Employer = require('../models/employer');

router.get('/', async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        const result = await db.getEmployerByEmail(res.locals.isLoggedIn.email);
        const employer = new Employer(result[0], db);
        const jobs = await employer.getPostedJobs();

        for (let i = 0; i < jobs.length; i++) {
            const date = new Date(jobs[i].date);
            const formattedDate = `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            jobs[i].date = formattedDate;
            jobs[i].company_name = result[0].company_name;
        }

        
        res.render('posted', {
            title: 'myJobs - Posted jobs',
            links: [
                { link: '/posted', text: 'Posted jobs' },
                { link: '/applicants', text: 'Applicants' }
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