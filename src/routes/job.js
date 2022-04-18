const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const id = req.query.id;
    const db = res.locals.db;
    const jobResult = await db.getJobById(id);
    const job = {
        id: jobResult[0].id,
        title: jobResult[0].title,
        description: jobResult[0].description,
        city: jobResult[0].city
    };

    const date = new Date(jobResult[0].date);
    const formattedDate = `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    job.date = formattedDate;
    const companyName = await db.getEmployerNameById(jobResult[0].employer_id);
    job.company_name = companyName[0].company_name;

    let isCorrectEmployer = false;
    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        const employerResult = await db.getEmployerByEmail(res.locals.isLoggedIn.email);
        if (employerResult[0].id == jobResult[0].employer_id) {
            isCorrectEmployer = true;
        }
    }

    res.render('job', {
            title: 'myJobs - Job title',
            job,
            is_logged_in: res.locals.isLoggedIn,
            is_employer: res.locals.isEmployer,
            is_correct_employer: isCorrectEmployer
    });

    db.disconnect();
});

module.exports = router;