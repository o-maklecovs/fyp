const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('posted', { title: 'myJobs - Posted jobs' }));

module.exports = router;