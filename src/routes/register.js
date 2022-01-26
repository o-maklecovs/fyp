const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('register', {
    title: 'myJobs - Register',
    heading: 'Register',
    action: '/register',
    is_employer: false
}));

module.exports = router;