const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        res.render('job_form', {
            title: 'myJobs - Edit job posting',
            heading: 'Edit job posting',
            action: '/edit',
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