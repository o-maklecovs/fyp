const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('list', { title: 'myJobs - Jobs in your area' }));

module.exports = router;