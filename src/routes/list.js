const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const db = res.locals.db;
    db.disconnect();
    res.render('list', {
        title: 'myJobs - Jobs in your area',
        is_logged_in: res.locals.isLoggedIn
    });
});

module.exports = router;