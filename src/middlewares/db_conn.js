const Db = require('../models/db');

async function dbConn(req, res, next) {
    const db = new Db();
    db.connect();
    res.locals.db = db;
    next();
}

module.exports = dbConn;