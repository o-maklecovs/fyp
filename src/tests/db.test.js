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
        id: 0,
        employerId: '1',
        title: 'Software developer',
        description: 'You will be developing software for one of the largest tech companies in the world.',
        city: 'London',
        date: new Date().toISOString()
    };
    const result = await db.createJob(details);
    expect(result.insertId).toBeTruthy();
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