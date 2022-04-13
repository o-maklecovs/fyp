const express = require('express');
const router = express.Router();
const validator = require('validator');

router.get('/', async (req, res) => {
    const id = req.query.id;
    const db = res.locals.db;
    const job = await db.getJobById(id);

    for (const [key, value] of Object.entries(job[0])) {
        job[0].key = validator.escape(value.toString());
    }
    const date = new Date(job[0].date);
    const formattedDate = `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    job[0].date = formattedDate;
    const companyName = await db.getEmployerNameById(job[0].employer_id);
    job[0].company_name = companyName[0].company_name;

    res.render('job', {
            title: 'myJobs - Job title',
            job,
            is_logged_in: res.locals.isLoggedIn
    });
});

router.get('/edit', (req, res) => {
    res.render('edit', {
        title: 'myJobs - Create job posting',
        is_logged_in: res.locals.isLoggedIn
    });
});

module.exports = router;