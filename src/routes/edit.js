const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('job_form', {
        title: 'myJobs - Edit job posting',
        heading: 'Edit job posting',
        action: '/edit',
        is_logged_in: res.locals.isLoggedIn,
        is_employer: res.locals.isEmployer
    });
});

module.exports = router;