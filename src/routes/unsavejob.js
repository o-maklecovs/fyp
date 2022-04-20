const express = require('express');
const router = express.Router();
const Seeker = require('../models/seeker');
const checkParams = require('../middlewares/checkParams');

router.post('/', checkParams, async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && !res.locals.isEmployer) {
        const seeker = await Seeker.getSeekerByEmail(res.locals.isLoggedIn.email, db);
        await seeker.removeFromFavourites(req.query.id);
    } else {
        res.redirect('/login');
    }

    db.disconnect();
});

module.exports = router;