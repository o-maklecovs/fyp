const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('job', {
            title: 'myJobs - Job title',
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