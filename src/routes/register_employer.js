const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('register', {
    title: 'myJobs - Register as employer',
    heading: 'Register as employer',
    action: '/register-employer',
    is_employer: true
}));

module.exports = router;