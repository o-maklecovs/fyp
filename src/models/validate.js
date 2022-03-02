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

    validateName(name) {
        const regex = /^[A-Za-z ]{2,}$/;
        return regex.test(name);
    }
}

module.exports = Validate;