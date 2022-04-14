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
        const id = this.#conn.escape(details.id);
        const company = this.#conn.escape(details.company);
        const email = this.#conn.escape(details.email);
        const password = this.#conn.escape(details.password);

        const query = `INSERT INTO employers (id, company_name, email, password) VALUES (${id}, ${company}, ${email}, ${password})`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    getEmployerByEmail(email) {
        const escapedEmail = this.#conn.escape(email);
        const query = `SELECT id, company_name, email FROM employers WHERE email = ${escapedEmail}`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    getEmployerNameById(id) {
        const escapedId = this.#conn.escape(id);
        const query = `SELECT company_name FROM employers WHERE id = ${escapedId}`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    updateEmployerPassword(id, password) {
        const escapedId = this.#conn.escape(id);
        const escapedPassword = this.#conn.escape(password);
        const query = `UPDATE employers SET password = ${escapedPassword} WHERE id = ${escapedId}`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    getPasswordEmployer(email) {
        const escapedEmail = this.#conn.escape(email);
        const query = `SELECT password FROM employers WHERE email = ${escapedEmail}`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            })
        });
    }

    getPostedJobs(eId) {
        const escapedEId = this.#conn.escape(eId)
        const query = `SELECT * FROM jobs WHERE employer_id = ${escapedEId}`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    getApplicantsById(eId) {
        const escapedEId = this.#conn.escape(eId);
        const query = `SELECT seekers.id, seekers.first_name, seekers.last_name, seekers.email, applications.date FROM seekers, applications, jobs WHERE jobs.employer_id = ${escapedEId} AND jobs.id = applications.job_id AND applications.seeker_id = seekers.id`;

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
        const escapedId = this.#conn.escape(id);
        const query = `DELETE FROM jobs WHERE id = ${escapedId} LIMIT 1`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    getAllJobsByCityAndTitle(title, city) {
        const escapedTitle = this.#conn.escape(title);
        const escapedCity = this.#conn.escape(city);

        const query = `SELECT * FROM jobs WHERE title LIKE ${escapedTitle} AND city LIKE ${escapedCity}`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    getJobById(id) {
        const escapedId = this.#conn.escape(id);
        const query = `SELECT * FROM jobs WHERE id = ${escapedId}`;
        
        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    createSeeker(details) {
        const id = this.#conn.escape(details.id);
        const firstName = this.#conn.escape(details.firstName);
        const lastName = this.#conn.escape(details.lastName);
        const email = this.#conn.escape(details.email);
        const password = this.#conn.escape(details.password);

        const query = `INSERT INTO seekers (id, first_name, last_name, email, password) VALUES (${id}, ${firstName}, ${lastName}, ${email}, ${password})`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    updatePasswordSeeker(id, newPassword) {
        const escapedId = this.#conn.escape(id);
        const escapedNewPassword = this.#conn.escape(newPassword);
        const query = `UPDATE seekers SET password = ${escapedNewPassword} WHERE id = ${escapedId}`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    getSeekerByEmail(email) {
        const escapedEmail = this.#conn.escape(email);
        const query = `SELECT id, first_name, last_name, email FROM seekers WHERE email = ${escapedEmail}`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    apply(jId, sId, date) {
        const escapedJId = this.#conn.escape(jId);
        const escapedSId = this.#conn.escape(sId);
        const escapedDate = this.#conn.escape(date);
        const query = `INSERT INTO applications (seeker_id, job_id, date, cv) VALUES (${escapedSId}, ${escapedJId}, ${escapedDate}, 'cv.pdf')`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    getAppliedJobs(id) {
        const escapedId = this.#conn.escape(id);
        const query = `SELECT jobs.* FROM jobs, applications WHERE applications.seeker_id = ${escapedId} AND jobs.id = applications.id`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            })
        });
    }

    addToFavourites(jId, sId) {
        const escapedJId = this.#conn.escape(jId);
        const escapedSId = this.#conn.escape(sId);
        const query = `INSERT INTO saved_jobs (job_id, seeker_id) VALUES (${escapedJId}, ${escapedSId})`;
        
        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    getFavouritesById(sId) {
        const escapedSId = this.#conn.escape(sId);
        const query = `SELECT jobs.* FROM jobs, saved_jobs WHERE saved_jobs.seeker_id = ${escapedSId} AND jobs.id = saved_jobs.job_id`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    getPasswordSeeker(email) {
        const escapedEmail = this.#conn.escape(email);
        const query = `SELECT password FROM seekers WHERE email = ${escapedEmail}`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            })
        });
    }

    disconnect() {
        this.#conn.end();
    }
}

module.exports = Db;