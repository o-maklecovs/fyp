const Db = require('../models/db');

const db = new Db();

beforeAll(() => {
    await db.connect();
});

afterAll(() => {
    db.disconnect();
});

