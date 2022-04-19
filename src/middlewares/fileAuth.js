function fileAuth(req, res, next) {
    if (res.locals.isLoggedIn && !res.locals.isEmployer) {
        next();
    } else {
        if (res.locals.isLoggedIn) {
            res.redirect('/profile-employer');
        } else {
            res.redirect(`/login`);
        }
    }
}

module.exports = fileAuth;