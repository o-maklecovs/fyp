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

    async create() {
        const result = await this.#db.createJob(this.#details);
        return result;
    }

    async update() {
        const result = await this.#db.updateJob(this.#details);
        return result;
    }
    
    delete() { }
}

module.exports = Job;