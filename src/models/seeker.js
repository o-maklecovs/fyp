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

    async updatePassword(bcryptWrapper) {
        this.#details.password = await bcryptWrapper.hashPassword(this.#details.password);
        await this.#db.updatePasswordSeeker(this.#details.id, this.#details.password);
    }

    apply(job) { }

    async getJobs() {
        const result = await this.#db.getAppliedJobs(this.#details.id);
        return result;
    }

    addToFavourites(job) { }

    async getFavourites() {
        const result = await this.#db.getFavouritesById(this.#details.id);
        return result;
    }
}

module.exports = Seeker;