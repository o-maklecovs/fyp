const express = require('express');
const router = express.Router();
const Seeker = require('../models/seeker');

router.post('/', async (req, res) => {
    const db = res.locals.db;

    if (res.locals.isLoggedIn && !res.locals.isEmployer) {
        if (req.query.id) {
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
            res.redirect('/');
        }
    } else {
        if (res.locals.isLoggedIn) {
            res.redirect('/profile-employer');
        } else {
            res.redirect('/login');
        }
    }

    db.disconnect();
});

module.exports = router;