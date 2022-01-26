const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('register_employer', { title: 'myJobs - Register as employer' }));

module.exports = router;