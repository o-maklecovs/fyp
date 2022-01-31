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

    insert(values, table, columns) {
        const cols = columns.join(', ');
        let vals = [];

        for (const key in values) {
            vals.push(this.conn.escape(values[key]));
        }

        vals = vals.join(', ');

        const query = `INSERT INTO ${table} (${cols}) VALUES (${vals});`;

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