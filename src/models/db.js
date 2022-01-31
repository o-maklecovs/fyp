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

    createEmployer(employer) {
        const details = [];

        for (const key in employer.details) {
            details.push(employer.details[key]);
        }

        const query = 'INSERT INTO employers (company_name, email, password) VALUES (?, ?, ?);';

        return new Promise((res, rej) => {
            this.conn.query(query, details, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    createJob(job) {
        const details = [];

        for (const key in job.details) {
            details.push(job.details[key]);
        }

        const query = 'INSERT INTO jobs (employer_id, title, description, city, date) VALUES (?, ?, ?, ?, ?);';

        return new Promise((res, rej) => {
            this.conn.query(query, details, (err, result) => {
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