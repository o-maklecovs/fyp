const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if (res.locals.isLoggedIn && res.locals.isEmployer) {
        const db = res.locals.db;
        const result = await db.getEmployerByEmail(res.locals.isLoggedIn.email);
        const name = result[0].company_name;
        const email = result[0].email;

        db.disconnect();

        res.render('profile', {
            title: 'myJobs - Employer profile',
            name_or_company: name,
            email,
            links: [
                { link: '/posted', text: 'Posted jobs' },
                { link: '/applicants', text: 'Applicants' }
            ],
            action: 'profile-employer',
            is_logged_in: res.locals.isLoggedIn,
            is_employer: res.locals.isEmployer
        });
    } else {
        if (res.locals.isLoggedIn) {
            res.redirect('/profile');
        } else {
            res.redirect('/employer');
        }
    }
});

module.exports = router;