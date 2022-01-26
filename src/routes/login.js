const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('login', {
    title: 'myJobs - Login',
    heading: 'Login',
    action: '/login',
    register_link: '/register'
}));

module.exports = router;