class Seeker {
    constructor(details, db) {
        this.details = details;
        this.db = db;
    }

    create() { }

    static async verifyPassword(email, pwd, db) {

        // hash password

        const verifyPwd = await db.checkPasswordSeeker(email, pwd);
        
        return verifyPwd;
    }

    updatePassword(newPassword) { }

    apply(job) { }

    getJobs() { }

    addToFavourites(job) { }

    getFavourites() { }
}

module.exports = Seeker;