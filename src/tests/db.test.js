const Db = require('../models/db');

const db = new Db();

const date = new Date().toISOString();

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
        company: 'Google',
        email: 'google@gmail.com',
        password: 'secret'
    };
    const result = await db.createEmployer(details);
    expect(result.insertId).toBeTruthy();
});

test('get employer by email', async () => {
    const email = 'google@gmail.com';
    const result = await db.getEmployerByEmail(email);
    expect(result[0]).toBeTruthy();
});

test('get employer\'s name by id', async () => {
    const id = '1';
    const result = await db.getEmployerNameById(id);
    expect(result[0]).toBeTruthy();
});

test('update employer\'s password', async () => {
    const id = '1';
    const password = 'newsecret';
    const result = await db.updateEmployerPassword(id, password);
    expect(result.changedRows).toBeTruthy();
});

test('get employer\'s password', async () => {
    const email = 'google@gmail.com';
    const result = await db.getPasswordEmployer(email);
    expect(result[0]).toBeTruthy();
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

test('get posted jobs', async () => {
    const employerId = '1';
    const result = await db.getPostedJobs(employerId);
    expect(result[0]).toBeTruthy();
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
    expect(result.affectedRows).toBeTruthy();
});

test('get all jobs by city and title', async () => {
    const title = 'Software developer';
    const city = 'London';
    const result = await db.getAllJobsByCityAndTitle(title, city);
    expect(result[0]).toBeTruthy();
});

test('get job by id', async () => {
    const id = '1';
    const result = await db.getJobById(id);
    expect(result[0]).toBeTruthy();
});

test('create seeker', async () => {
    const details = {
        id: 0,
        firstName: 'john',
        lastName: 'doe',
        email: 'john@gmail.com',
        password: 'secret'
    };
    const result = await db.createSeeker(details);
    expect(result.insertId).toBeTruthy();
});

test('update seeker\'s password', async () => {
    const id = '1';
    const newPassword = 'newsecret';
    const result = await db.updatePasswordSeeker(id, newPassword);
    expect(result.affectedRows).toBeTruthy();
});

test('apply for job', async () => {
    const jobId = '1';
    const seekerId = '1';
    const result = await db.apply(jobId, seekerId, date);
    expect(result.insertId).toBeTruthy();
});

test('get applicants', async () => {
    const eId = '1';
    const result = await db.getApplicantsById(eId);
    expect(result[0]).toBeTruthy();
});

test('get seeker by email', async () => {
    const email = 'john@gmail.com';
    const result = await db.getSeekerByEmail(email);
    expect(result[0]).toBeTruthy();
});

test('get seeker\'s jobs', async () => {
    const id = '1';
    const result = await db.getAppliedJobs(id);
    console.log(result);
    expect(result[0]).toBeTruthy();
});

test('add to favourites', async () => {
    const jId = '1';
    const sId = '1';
    const result = await db.addToFavourites(jId, sId);
    expect(result.insertId).toBeTruthy();
});

test('get favourites by seeker id', async () => {
    const sId = '1';
    const result = await db.getFavouritesById(sId);
    expect(result[0]).toBeTruthy();
});

test('get seeker\'s password', async () => {
    const email = 'john@gmail.com';
    const result = await db.getPasswordSeeker(email);
    expect(result[0]).toBeTruthy();
});

test('delete job', async () => {
    const id = '1';
    const result = await db.deleteJob(id);
    expect(result.affectedRows).toBeTruthy();
});