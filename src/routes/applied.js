const express = require('express');
const router = express.Router();
const Seeker = require('../models/seeker');

router.get('/', async (req, res) => {
    if (res.locals.isLoggedIn && !res.locals.isEmployer) {
        const db = res.locals.db;
        const result = await db.getSeekerByEmail(res.locals.isLoggedIn.email);
        const seeker = new Seeker(result[0], db);
        const jobs = await seeker.getJobs();

        for (let i = 0; i < jobs.length; i++) {
            const date = new Date(jobs[i].date);
            const formattedDate = `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            jobs[i].date = formattedDate;
            const companyName = await db.getEmployerNameById(jobs[i].employer_id);
            jobs[i].company_name = companyName[0].company_name;
        }

        db.disconnect();

        res.render('applied', {
            title: 'myJobs - Applied jobs',
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
});

module.exports = router;