function fileAuth(req, res, next) {
    if (res.locals.isLoggedIn && !res.locals.isEmployer) {
        next();
    } else {
        res.redirect(`/login`);
    }
}

module.exports = fileAuth;