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

    async updatePassword(bcryptWrapper) {
        this.#details.password = await bcryptWrapper.hashPassword(this.#details.password);
        await this.#db.updateEmployerPassword(this.#details.id, this.#details.password);
    }

    async getPostedJobs() {
        const result = await this.#db.getPostedJobs(this.#details.id);
        return result;
    }

    async getApplicants() {
        const result = await this.#db.getApplicantsById(this.#details.id);
        return result;
    }
}

module.exports = Employer;