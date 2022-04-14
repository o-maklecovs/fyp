const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if (res.locals.isLoggedIn) {
        const db = res.locals.db;
        const seeker = await db.getSeekerByEmail(res.locals.isLoggedIn.email);
        const jobs = await db.getAppliedJobs(seeker[0].id);

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