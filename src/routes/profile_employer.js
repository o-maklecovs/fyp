const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('profile_employer', { title: 'myJobs - Employer profile' }));

module.exports = router;