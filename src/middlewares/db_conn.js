const Db = require('../models/db');

async function dbConn(req, res, next) {
    const db = new Db();
    await db.connect().catch(e => {
        console.error(e);
    });
    res.locals.db = db;
    next();
}

module.exports = dbConn;