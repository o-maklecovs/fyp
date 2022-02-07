const mysql = require('mysql');
const dbSettings = require('../configs/db_config');

class Db {
    #settings;
    #conn;

    constructor() {
        this.#settings = dbSettings;
        this.#conn = mysql.createConnection(this.#settings);
    }

    connect() {
        return new Promise((res, rej) => {
            this.#conn.connect(err => {
                if (err) rej(err);
                res();
            });
        });
    }

    createEmployer(details) {
        let vals = [];
        for (const key in details) {
            vals.push(this.#conn.escape(details[key]));
        }
        vals = vals.join(', ');

        const query = `INSERT INTO employers (id, company_name, email, password) VALUES (${vals})`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    createJob(details) {
        let vals = [];
        for (const key in details) {
            vals.push(this.#conn.escape(details[key]));
        }
        vals = vals.join(', ');

        const query = `INSERT INTO jobs (id, employer_id, title, description, city, date) VALUES (${vals})`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    createSeeker(details) {
        let vals = [];
        for (const key in details) {
            vals.push(this.#conn.escape(details[key]));
        }
        vals = vals.join(', ');

        const query = `INSERT INTO seekers (id, first_name, last_name, email, password) VALUES (${vals})`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    disconnect() {
        this.#conn.end();
    }
}

module.exports = Db;