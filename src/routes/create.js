const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('job_form', {
    title: 'myJobs - Create job posting',
    heading: 'Create job posting',
    action: '/create'
}));

module.exports = router;