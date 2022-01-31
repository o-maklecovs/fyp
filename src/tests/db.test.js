const Db = require('../models/db');
const Job = require('../models/job');
const Employer = require('../models/employer');

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
        company_name: 'Google',
        email: 'google@gmail.com',
        password: 'secret'
    };
    const employer = new Employer(details, db);
    const data = await db.createEmployer(employer);
    expect(data.insertId).toBeTruthy();
});

test('create job', async () => {
    const details = {
        employerId: '1',
        title: 'Software developer',
        description: 'You will be developing software for one of the largest tech companies in the world.',
        city: 'London',
        date: new Date().toISOString()
    };
    const job = new Job(details, db);
    const data = await db.createJob(job);
    expect(data.insertId).toBeTruthy();
});