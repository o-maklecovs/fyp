const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('login', {
    title: 'myJobs - Employer',
    heading: 'Employer',
    action: '/employer',
    register_link: '/register-employer'
}));

module.exports = router;