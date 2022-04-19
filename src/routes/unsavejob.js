const express = require('express');
const router = express.Router();
const Seeker = require('../models/seeker');
const checkParams = require('../middlewares/checkParams');

router.post('/', checkParams, async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && !res.locals.isEmployer) {
        const seekerResult = await db.getSeekerByEmail(res.locals.isLoggedIn.email);
        const details = {
            id: seekerResult[0].id,
            first_name: seekerResult[0].first_name,
            last: seekerResult[0].last_name,
            email: seekerResult[0].email
        };
        const seeker = new Seeker(details, db);
        await seeker.removeFromFavourites(req.query.id);
    } else {
        res.redirect('/login');
    }

    db.disconnect();
});

module.exports = router;