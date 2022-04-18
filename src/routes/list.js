const express = require('express');
const router = express.Router();
const validator = require('validator');

router.get('/', async (req, res) => {
    const query = req.query.search_query;
    const city = req.query.search_city;
    const db = res.locals.db;
    const jobs = await db.getAllJobsByCityAndTitle(query, city);
    
    for (let i = 0; i < jobs.length; i++) {
        for (const [key, value] of Object.entries(jobs[i])) {
            jobs[i].key = validator.escape(value.toString());
        }
        const date = new Date(jobs[i].date);
        const formattedDate = `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        jobs[i].date = formattedDate;
        const companyName = await db.getEmployerNameById(jobs[i].employer_id);
        jobs[i].company_name = companyName[0].company_name;
    }
    
    res.render('list', {
        title: 'myJobs - Jobs in your area',
        jobs,
        is_logged_in: res.locals.isLoggedIn,
        is_employer: res.locals.isEmployer
    });

    db.disconnect();
});

module.exports = router;