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

    updateJob(details) {
        let vals = {};
        for (const key in details) {
            vals[key] = this.#conn.escape(details[key]);
        }

        const query = `UPDATE jobs SET title = ${vals.title}, description = ${vals.description}, city = ${vals.city}, date = ${vals.date} WHERE id = ${vals.id}`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    deleteJob(id) {
        const query = `DELETE FROM jobs WHERE id = ${this.#conn.escape(id)} LIMIT 1`;

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

    checkPasswordSeeker(email, password) {
        const escapedEmail = this.#conn.escape(email);
        const escapedPassword = this.#conn.escape(password);

        const query = `SELECT * FROM seekers WHERE email = ${escapedEmail} AND password = ${escapedPassword}`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                if (Object.keys(result).length === 0) res(false);
                else res(true);
            })
        });
    }

    disconnect() {
        this.#conn.end();
    }
}

module.exports = Db;