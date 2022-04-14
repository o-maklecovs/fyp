const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if (res.locals.isLoggedIn) {
        const db = res.locals.db;
        const employer = await db.getEmployerByEmail(res.locals.isLoggedIn.email);
        const jobs = await db.getPostedJobs(employer[0].id);

        for (let i = 0; i < jobs.length; i++) {
            const date = new Date(jobs[i].date);
            const formattedDate = `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            jobs[i].date = formattedDate;
            jobs[i].company_name = employer[0].company_name;
        }

        db.disconnect();

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
        res.redirect('/employer');
    }
});

module.exports = router;