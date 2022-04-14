const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('applicants', {
        title: 'myJobs - Applicants',
        links: [
            { link: '/posted', text: 'Posted jobs' },
            { link: '/applicants', text: 'Applicants' }
        ],
        is_logged_in: res.locals.isLoggedIn,
        is_employer: res.locals.isEmployer
    });
});

module.exports = router;