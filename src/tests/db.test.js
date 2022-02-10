const Db = require('../models/db');

const db = new Db();

async function initDb() {
    await db.connect();
}

beforeAll(() => {
    initDb();
});

afterAll(() => {
    db.disconnect();
});

test('create employer', async () => {
    const details = {
        id: 0,
        companyName: 'Google',
        email: 'google@gmail.com',
        password: 'secret'
    };
    const result = await db.createEmployer(details);
    expect(result.insertId).toBeTruthy();
});

test('create job', async () => {
    const details = {
        id: '0',
        employerId: '1',
        title: 'Software developer',
        description: 'You will be developing software for one of the largest tech companies in the world.',
        city: 'London',
        date: new Date().toISOString()
    };
    const result = await db.createJob(details);
    expect(result.insertId).toBeTruthy();
});

test('update job', async () => {
    const details = {
        id: '1',
        employerId: '1',
        title: 'Web developer',
        description: 'You will be developing web applications for one of the largest tech companies in the world.',
        city: 'Birmingham',
        date: new Date().toISOString()
    };
    const result = await db.updateJob(details);
    expect(result).toBeTruthy();
});

test('delete job', async () => {
    const id = '1';
    const result = await db.deleteJob(id);
    expect(result.affectedRows).toBeTruthy();
});

test('create seeker', async () => {
    const details = {
        id: 0,
        first_name: 'john',
        last_name: 'doe',
        email: 'john@gmail.com',
        password: 'secret'
    };
    const result = await db.createSeeker(details);
    expect(result.insertId).toBeTruthy();
});

test('check seeker\'s password', async () => {
    const email = 'john@gmail.com';
    const password = 'secret';
    const result = await db.checkPasswordSeeker(email, password);
    expect(result).toBeTruthy();
});