const Job = require('./job');

class Seeker {
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

    static async getSeekerByEmail(email, db) {
        const result = await db.getSeekerByEmail(email);
        return new this(result[0], db);
    }

    async create(bcryptWrapper) {
        this.#details.password = await bcryptWrapper.hashPassword(this.#details.password);
        await this.#db.createSeeker(this.#details);
    }

    static async verifyPassword(email, password, db, bcryptWrapper) {
        let match = false;
        if (password) {
            const hashedPassword = await db.getPasswordSeeker(email);
            if (hashedPassword.length) {
                match = await bcryptWrapper.comparePassword(password, hashedPassword[0].password);
            }
        }
        return match;
    }

    async updatePassword(newPassword, bcryptWrapper) {
        const hashedPassword = await bcryptWrapper.hashPassword(newPassword);
        await this.#db.updatePasswordSeeker(this.#details.id, hashedPassword);
    }

    async apply(jobId, filename) {
        await this.#db.apply(jobId, this.#details.id, filename);
    }

    async getJobs() {
        const result = await this.#db.getAppliedJobs(this.#details.id);
        const jobs = [];
        result.forEach(entry => {
            entry.date = this.formatDate(entry.date);
            const job = new Job(entry, this.#db);
            jobs.push(job);
        });
        return jobs;
    }

    async addToFavourites(jobId) {
        await this.#db.addToFavourites(jobId, this.#details.id);
    }

    async removeFromFavourites(jobId) {
        await this.#db.removeFromFavourites(jobId, this.#details.id);
    }

    async getFavourites() {
        const result = await this.#db.getFavouritesById(this.#details.id);
        const jobs = [];
        result.forEach(entry => {
            entry.date = this.formatDate(entry.date);
            const job = new Job(entry, this.#db);
            jobs.push(job);
        });
        return jobs;
    }

    async isJobSaved(jobId) {
        const result = await this.#db.checkJobIsSaved(this.#details.id, jobId);
        if (result.length) {
            return true;
        }
        return false;
    }

    formatDate(date) {
        const oldDate = new Date(date);
        const formattedDate = `${oldDate.getUTCDate()}/${oldDate.getMonth() + 1}/${oldDate.getFullYear()}`;
        return formattedDate;
    }
}

module.exports = Seeker;