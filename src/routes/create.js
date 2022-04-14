const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        res.render('job_form', {
            title: 'myJobs - Create job posting',
            heading: 'Create job posting',
            action: '/create',
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