class Seeker {
    #details;
    #db;
    #bcryptWrapper;

    constructor(details, db, bcryptWrapper) {
        this.#details = details;
        this.#db = db;
        this.#bcryptWrapper = bcryptWrapper;
    }

    create() { }

    static async verifyPassword(email, password, db, bcryptWrapper) {
        const hashedPassword = await db.getPasswordSeeker(email);
        if (hashedPassword.length > 0) {
            const match = bcryptWrapper.comparePassword(password, hashedPassword)
                .then(true)
                .catch(false);
        }
        return false;
    }

    updatePassword(newPassword) { }

    apply(job) { }

    getJobs() { }

    addToFavourites(job) { }

    getFavourites() { }
}

module.exports = Seeker;