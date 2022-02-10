const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!res.locals.isLoggedIn) {
        res.redirect('/login');
    } else {
        res.cookie('token', null, { httpOnly: true });
        res.redirect('/');
    }
});

module.exports = router;