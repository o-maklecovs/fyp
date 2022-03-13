class Validate {
    constructor() { }

    validatePassword(password) {
        const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`!"$%^&*()_+\-={}\];'#:@~,./<>?\\\|])[A-Za-z\d`!"$%^&*()_+\-={}\];'#:@~,./<>?\\\|]{8,}/;
        return regex.test(password);
    }

    validateEmail(email) {
        const regex = /^[A-Za-z._%+-]+@[A-Za-z]+\.[A-Za-z]{2,}$/;
        return regex.test(email);
    }

    validateString(str) {
        const regex = /^[A-Za-z ]{1,}$/;
        return regex.test(str);
    }
}

module.exports = Validate;