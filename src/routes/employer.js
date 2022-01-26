const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('login_employer', { title: 'myJobs - Employer' }));

module.exports = router;