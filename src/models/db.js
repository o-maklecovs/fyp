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

    getEmployerById(id) {
        const escapedId = this.#conn.escape(id);
        const query = `SELECT id, company_name, email FROM employers WHERE id = ${escapedId}`;

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
        const query = `SELECT seekers.id, seekers.first_name, seekers.last_name, seekers.email, applications.date, applications.job_id FROM seekers, applications, jobs WHERE jobs.employer_id = ${escapedEId} AND jobs.id = applications.job_id AND applications.seeker_id = seekers.id`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    getCvByJobAndSeekerId(jId, sId) {
        const escapedSId = this.#conn.escape(sId);
        const escapedJId = this.#conn.escape(jId);
        const query = `SELECT cv FROM applications WHERE seeker_id = ${escapedSId} AND job_id = ${escapedJId}`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    createJob(details) {
        const escapedId = this.#conn.escape(details.id);
        const escapedEmployerId = this.#conn.escape(details.employer_id);
        const escapedTitle = this.#conn.escape(details.title);
        const escapedDescription = this.#conn.escape(details.description);
        const escapedCity = this.#conn.escape(details.city);
        const escapedDate = this.#conn.escape(details.date);

        const query = `INSERT INTO jobs (id, employer_id, title, description, city, date) VALUES (${escapedId}, ${escapedEmployerId}, ${escapedTitle}, ${escapedDescription}, ${escapedCity}, ${escapedDate})`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    updateJob(details) {
        const escapedId = this.#conn.escape(details.id);
        const escapedTitle = this.#conn.escape(details.title);
        const escapedDescription = this.#conn.escape(details.description);
        const escapedCity = this.#conn.escape(details.city);

        const query = `UPDATE jobs SET title = ${escapedTitle}, description = ${escapedDescription}, city = ${escapedCity} WHERE id = ${escapedId}`;

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
        const escapedTitle = this.#conn.escape(`(\w*)${title}(\w*)`);
        const escapedCity = this.#conn.escape(`(\w*)${city}(\w*)`);

        const query = `SELECT * FROM jobs WHERE title REGEXP ${escapedTitle} AND city REGEXP ${escapedCity}`;

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

    apply(jId, sId, filename) {
        const escapedJId = this.#conn.escape(jId);
        const escapedSId = this.#conn.escape(sId);
        const escapedFilename = this.#conn.escape(filename);
        const query = `INSERT INTO applications (seeker_id, job_id, date, cv) VALUES (${escapedSId}, ${escapedJId}, CURRENT_TIMESTAMP, ${escapedFilename})`;

        return new Promise((res, rej) => {
            this.#conn.query(query, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
    }

    getAppliedJobs(id) {
        const escapedId = this.#conn.escape(id);
        const query = `SELECT jobs.* FROM jobs, applications WHERE applications.seeker_id = ${escapedId} AND jobs.id = applications.job_id`;

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

    removeFromFavourites(jId, sId) {
        const escapedJId = this.#conn.escape(jId);
        const escapedSId = this.#conn.escape(sId);
        const query = `DELETE FROM saved_jobs WHERE job_id = ${escapedJId} AND seeker_id =  ${escapedSId} LIMIT 1`;
        
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

    checkJobIsSaved(sId, jId) {
        const escapedSId = this.#conn.escape(sId);
        const escapedJId = this.#conn.escape(jId);
        const query = `SELECT * FROM saved_jobs WHERE seeker_id = ${escapedSId} AND job_id = ${escapedJId}`;

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