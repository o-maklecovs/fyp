const Authenticate = require('../models/auth');

function verifyLogin(req, res, next) {
    let isLoggedIn = false;

    if (req.cookies.token) {
        const auth = new Authenticate();
        isLoggedIn = auth.isLoggedIn(req.cookies.token);
    }

    res.locals.isLoggedIn = isLoggedIn;
    next();
}

module.exports = verifyLogin;