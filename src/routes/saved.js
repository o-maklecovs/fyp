const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('saved', {
    title: 'myJobs - Saved jobs',
    links: [
        { link: '/saved', text: 'Saved jobs' },
        { link: '/applied', text: 'Applied jobs' }
    ]
}));

module.exports = router;