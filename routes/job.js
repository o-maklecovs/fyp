const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('job', { title: 'myJobs - Job title' }));
router.get('/edit', (req, res) => res.render('edit', { title: 'myJobs - Create job posting' }));

module.exports = router;