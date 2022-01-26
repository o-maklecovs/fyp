const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('posted', {
    title: 'myJobs - Posted jobs',
    links: [
        { link: '/posted', text: 'Posted jobs' },
        { link: '/applicants', text: 'Applicants' }
    ]
}));

module.exports = router;