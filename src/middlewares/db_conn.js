const Db = require('../models/db');

async function dbConn(req, res, next) {
    const db = new Db();
    try {
        await db.connect();
        res.locals.db = db;
        next();
    } catch (e) {
        console.error(e);
    }
}

module.exports = dbConn;