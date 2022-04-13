async function isEmployer(req, res, next) {
    if (res.locals.isLoggedIn) {
        const db = res.locals.db;
        let isEmployer = false;
    
        const employer = await db.getEmployerByEmail(res.locals.isLoggedIn.email);
    
        if (employer.length) {
            isEmployer = true;
        }

        res.locals.isEmployer = isEmployer;
    }

    next();
}

module.exports = isEmployer;