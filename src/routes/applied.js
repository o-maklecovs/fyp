const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('applied', {
        title: 'myJobs - Applied jobs',
        links: [
            { link: '/saved', text: 'Saved jobs' },
            { link: '/applied', text: 'Applied jobs' }
        ],
        is_logged_in: res.locals.isLoggedIn
    });
});

module.exports = router;