const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class Authenticate {
    #db;

    constructor(db) {
        this.#db = db;
    }

    login(details) {
        // verify password

        const token = jwt.sign({ email: details.email }, process.env.TOKEN_SECRET);

        return token;
    }

    isLoggedIn(token) {
        try {
            const details = jwt.verify(token, process.env.TOKEN_SECRET);
            return details;
        } catch (e) {
            return false;
        }
    }
}