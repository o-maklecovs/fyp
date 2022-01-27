const mysql = require('mysql');
const dbSettings = require('../configs/db_config');

class Db {
    constructor() {
        this.settings = dbSettings;
        this.conn = mysql.createConnection(this.settings);
    }

    connect() {
        return new Promise((res, rej) => {
            this.conn.connect(err => {
                if (err) rej(err);
                res();
            });
        });
    }

    test() {
        const query = 'SELECT * FROM jobs';
        return new Promise((res, rej) => {
            this.conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    disconnect() {
        this.conn.end();
    }
}

module.exports = Db;