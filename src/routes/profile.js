const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const auth = res.locals.isLoggedIn;

    if (auth) {
        res.render('profile', {
            title: 'myJobs - Profile',
            name_or_company: 'Name',
            links: [
                { link: '/saved', text: 'Saved jobs' },
                { link: '/applied', text: 'Applied jobs' }
            ]});
    } else {
        res.redirect('/login');
    }
});

module.exports = router;