const express = require('express');
const router = express.Router();
const dbConn = require('../middlewares/db_conn');

router.get('/', dbConn, async (req, res) => {
    const db = res.locals.db;
    try {
        const result = await db.test();
        console.log(result);
        db.disconnect();
    } catch (e) {
        console.error(e);
    }
    res.render('list', { title: 'myJobs - Jobs in your area' });
});

module.exports = router;