const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('create', { title: 'myJobs - Create job posting' }));

module.exports = router;