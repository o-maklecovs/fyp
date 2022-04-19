const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');
const upload = multer({ dest: process.env.DOWNLOAD_PATH });
const Seeker = require('../models/seeker');
const fileAuth = require('../middlewares/fileAuth');
const fs = require('fs').promises;
const checkParams = require('../middlewares/checkParams');

router.post('/', fileAuth, checkParams, upload.single('upload-file'), async (req, res) => {
    const db = res.locals.db;

    if (req.query.id) {
        const jobResult = await db.getJobById(req.query.id);

        const seekerResult = await db.getSeekerByEmail(res.locals.isLoggedIn.email);
        const seeker = new Seeker(seekerResult[0], db);
        await fs.rename(`${process.env.DOWNLOAD_PATH}/${req.file.filename}`, `${process.env.DOWNLOAD_PATH}/${req.file.filename}.pdf`);
        await seeker.apply(jobResult[0].id, `${req.file.filename}.pdf`);
        res.redirect('/applied');
    } else {
        res.redirect('/');
    }

    db.disconnect();
});

module.exports = router;