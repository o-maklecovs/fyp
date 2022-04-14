const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    if (res.locals.isLoggedIn) {
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
        res.redirect('/login');
    }
});

module.exports = router;