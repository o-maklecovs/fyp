const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const db = res.locals.db;

    if (!res.locals.isLoggedIn) {
        res.redirect('/login');
    } else {
        res.cookie('token', null, { httpOnly: true });
        res.redirect('/');
    }

    db.disconnect();
});

module.exports = router;