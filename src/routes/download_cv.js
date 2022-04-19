const express = require('express');
const router = express.Router();
const checkParams = require('../middlewares/checkParams');

router.get('/', checkParams, async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        const employerResult = await db.getEmployerByEmail(res.locals.isLoggedIn.email);
        const jobResult = await db.getJobById(req.query.job);

        if (jobResult[0].employer_id == employerResult[0].id) {
            const cvResult = await db.getCvByJobAndSeekerId(req.query.job, req.query.seeker);
            const filename = cvResult[0].cv;
            res.sendFile(`/uploads/${filename}`);
        } else {
            res.redirect('/applicants');
        }
    } else {
        res.redirect('/login');
    }

    db.disconnect();
});

module.exports = router;