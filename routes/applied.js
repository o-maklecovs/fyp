const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('applied', { title: 'myJobs - Applied jobs' }));

module.exports = router;