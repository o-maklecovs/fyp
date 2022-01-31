const express = require('express');
const router = express.Router();
const dbConn = require('../middlewares/db_conn');

router.get('/', dbConn, async (req, res) => {
    const db = res.locals.db;
    db.disconnect();
    res.render('list', { title: 'myJobs - Jobs in your area' });
});

module.exports = router;