const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');
const upload = multer({
    dest: process.env.DOWNLOAD_PATH,
    fileFilter: (req, file, cb) => {
        const filetypes = /pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            return cb(null, false);
        }
    }
});
const Seeker = require('../models/seeker');
const Job = require('../models/job');
const fileAuth = require('../middlewares/fileAuth');
const fs = require('fs').promises;
const checkParams = require('../middlewares/checkParams');

router.post('/', fileAuth, checkParams, upload.single('upload-file'), async (req, res) => {
    const db = res.locals.db;

    if (req.file) {
        const job = await Job.getJobById(req.query.id, db);
        const seeker = await Seeker.getSeekerByEmail(res.locals.isLoggedIn.email, db);
        await fs.rename(`${process.env.DOWNLOAD_PATH}/${req.file.filename}`, `${process.env.DOWNLOAD_PATH}/${req.file.filename}.pdf`);
        await seeker.apply(job.getDetails().id, `${req.file.filename}.pdf`);
        res.redirect('/applied');
    } else {
        res.redirect(`/job?id=${req.query.id}`);
    }

    db.disconnect();
});

module.exports = router;