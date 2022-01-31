const express = require('express');
const router = express.Router();
const dbConn = require('../middlewares/db_conn');

router.get('/', dbConn, async (req, res) => {
    const db = res.locals.db;
    const result = await db.test().catch(e => {
        console.error(e);
    });
    console.log(result);
    db.disconnect();
    res.render('list', { title: 'myJobs - Jobs in your area' });
});

module.exports = router;