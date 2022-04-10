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
        if (password) {
            const hashedPassword = await db.getPasswordSeeker(email);
            if (hashedPassword.length) {
                match = await bcryptWrapper.comparePassword(password, hashedPassword[0].password);
            }
        }
        return match;
    }

    async updatePassword(newPassword) {
        await this.#db.updatePasswordSeeker(this.#details.id, newPassword);
    }

    apply(job) { }

    getJobs() { }

    addToFavourites(job) { }

    getFavourites() { }
}

module.exports = Seeker;