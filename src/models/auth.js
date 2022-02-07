const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class Authenticate {
    login(email) {
        const token = jwt.sign({ email: email }, process.env.TOKEN_SECRET);
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

module.exports = Authenticate;