const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const query = req.query.search_query;
    const city = req.query.search_city;
    const db = res.locals.db;
    const jobs = await db.getAllJobsByCityAndTitle(query, city);
    db.disconnect();
    res.render('list', {
        title: 'myJobs - Jobs in your area',
        jobs,
        is_logged_in: res.locals.isLoggedIn
    });
});

module.exports = router;