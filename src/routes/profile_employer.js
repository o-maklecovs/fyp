const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('profile', {
    title: 'myJobs - Employer profile',
    name_or_company: 'Company name',
    links: [
        { link: '/posted', text: 'Posted jobs' },
        { link: '/applicants', text: 'Applicants' }
    ]
}));

module.exports = router;