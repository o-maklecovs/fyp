const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('profile', { title: 'myJobs - Profile' }));

module.exports = router;