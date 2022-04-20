class Job {
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

    static async getJobById(id, db) {
        const result = await db.getJobById(id);
        result[0].date = this.formatDate(result[0].date);
        const job = new this(result[0], db);
        return job;
    }

    async create() {
        const result = this.#db.createJob(this.#details);
        return result;
    }

    async update(newDetails) {
        await this.#db.updateJob(newDetails);
    }
    
    async delete() {
        await this.#db.deleteJob(this.#details.id);
    }

    static async searchJobs(title, city, db) {
        const result = await db.getAllJobsByCityAndTitle(title, city);
        const jobs = [];
        result.forEach(entry => {
            entry.date = this.formatDate(entry.date);
            const job = new this(entry, db);
            jobs.push(job);
        });
        return jobs;
    }

    static formatDate(date) {
        const oldDate = new Date(date);
        const formattedDate = `${oldDate.getUTCDate()}/${oldDate.getMonth() + 1}/${oldDate.getFullYear()}`;
        return formattedDate;
    }
}

module.exports = Job;