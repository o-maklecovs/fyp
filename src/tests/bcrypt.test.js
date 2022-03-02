const BcryptWrapper = require('../models/bcryptWrapper');

const bcryptWrapper = new BcryptWrapper();

test('hash and compare password', () => {
    return bcryptWrapper.hashPassword('secret')
        .then(result => bcryptWrapper.comparePassword('secret', result)
            .then(result => expect(result).toBeTruthy()));
});