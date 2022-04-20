const Job = require('./job');

class Employer {
    #details;
    #db;

    constructor(details, db) {
        this.#details = details;
        if (!this.#details.hasOwnProperty('id')) {
            this.#details.id = '0';
        }
        this.#db = db;
    }

    getDetails() {
        return this.#details;
    }

    static async getEmployerByEmail(email, db) {
        const result = await db.getEmployerByEmail(email);
        return new this(result[0], db);
    }

    static async getEmployerById(id, db) {
        const result = await db.getEmployerById(id);
        return new this(result[0], db);
    }

    async create(bcryptWrapper) {
        this.#details.password = await bcryptWrapper.hashPassword(this.#details.password);
        await this.#db.createEmployer(this.#details);
    }

    static async verifyPassword(email, password, db, bcryptWrapper) {
        let match = false;
        const hashedPassword = await db.getPasswordEmployer(email);
        if (hashedPassword.length) {
            match = await bcryptWrapper.comparePassword(password, hashedPassword[0].password);
        }
        return match;
    }

    async updatePassword(newPassword, bcryptWrapper) {
        const hashedPassword = await bcryptWrapper.hashPassword(newPassword);
        await this.#db.updateEmployerPassword(this.#details.id, hashedPassword);
    }

    async getPostedJobs() {
        const result = await this.#db.getPostedJobs(this.#details.id);
        const jobs = [];
        result.forEach(entry => {
            entry.date = this.formatDate(entry.date);
            const job = new Job(entry, this.#db);
            jobs.push(job);
        });
        return jobs;
    }

    async getApplicants() {
        const result = await this.#db.getApplicantsById(this.#details.id);
        const applicants = [];
        for (const entry of result) {
            entry.date = this.formatDate(entry.date);
            const job = await Job.getJobById(entry.job_id, this.#db);
            entry.title = job.getDetails().title;
            applicants.push(entry);
        }
        return applicants;
    }

    async getApplicantCv(jobId, seekerId) {
        const result = await this.#db.getCvByJobAndSeekerId(jobId, seekerId);
        return result[0];
    }

    formatDate(date) {
        const oldDate = new Date(date);
        const formattedDate = `${oldDate.getUTCDate()}/${oldDate.getMonth() + 1}/${oldDate.getFullYear()}`;
        return formattedDate;
    }
}

module.exports = Employer;