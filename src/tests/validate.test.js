const { TestWatcher } = require('jest');
const Validate = require('../models/validate');

const validate = new Validate();

test('validate password', () => {
    const password = 'SecretPassword0_';
    expect(validate.validatePassword(password)).toBeTruthy();
});

test('validate email', () => {
    const email = 'john@gmail.com';
    expect(validate.validateEmail(email)).toBeTruthy();
});

test('validate string', () => {
    const str = 'John Doe';
    expect(validate.validateString(str)).toBeTruthy();
});