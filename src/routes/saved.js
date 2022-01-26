const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('saved', { title: 'myJobs - Saved jobs' }));

module.exports = router;