const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if (res.locals.isLoggedIn) {
        const db = res.locals.db;
        const result = await db.getSeekerByEmail(res.locals.isLoggedIn.email);
        const name = `${result[0].first_name} ${result[0].last_name}`;
        const email = result[0].email;

        res.render('profile', {
            title: 'myJobs - Profile',
            name_or_company: name,
            email,
            links: [
                { link: '/saved', text: 'Saved jobs' },
                { link: '/applied', text: 'Applied jobs' }
            ],
            action: '/profile',
            is_logged_in: res.locals.isLoggedIn
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;