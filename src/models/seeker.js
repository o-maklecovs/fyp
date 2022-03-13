class Seeker {
    #details;
    #db;
    #bcryptWrapper;

    constructor(details, db, bcryptWrapper) {
        this.#details = details;
        if (!this.#details.hasOwnProperty('id')) {
            this.#details.id = '0';
        }
        this.#db = db;
        this.#bcryptWrapper = bcryptWrapper;
    }

    async create() {
        this.#details.password = await this.#bcryptWrapper.hashPassword(this.#details.password);
        await this.#db.createSeeker(this.#details);
    }

    static async verifyPassword(email, password, db, bcryptWrapper) {
        let match = false;
        const hashedPassword = await db.getPasswordSeeker(email);
        if (hashedPassword[0].password.length > 0) {
            match = await bcryptWrapper.comparePassword(password, hashedPassword[0].password);
        }
        return match;
    }

    updatePassword(newPassword) { }

    apply(job) { }

    getJobs() { }

    addToFavourites(job) { }

    getFavourites() { }
}

module.exports = Seeker;