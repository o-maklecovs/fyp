function checkParams(req, res, next) {
    if (Object.entries(req.query).length) {
        next();
    } else {
        res.render('notfound', {
            title: 'myJobs - Page not found',
            is_logged_in: res.locals.isLoggedIn,
            is_employer: res.locals.isEmployer
        });
    }
}

module.exports = checkParams;