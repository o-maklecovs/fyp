const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const db = res.locals.db;

    const result = await db.getCvByJobAndSeekerId(req.query.job, req.query.seeker);
    const filename = result[0].cv;

    res.sendFile(`/uploads/${filename}`);

    db.disconnect();
});

module.exports = router;