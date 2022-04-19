const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const upload = multer({
    dest: '/uploads', // change later to env variable
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
const fileAuth = require('../middlewares/fileAuth');
const fs = require('fs').promises;

router.post('/', fileAuth, upload.single('upload-file'), async (req, res) => {
    const db = res.locals.db;

    if (req.query.id) {
        const jobResult = await db.getJobById(req.query.id);

        const seekerResult = await db.getSeekerByEmail(res.locals.isLoggedIn.email);
        const seeker = new Seeker(seekerResult[0], db);
        await fs.rename(`/uploads/${req.file.filename}`, `/uploads/${req.file.filename}.pdf`);
        await seeker.apply(jobResult[0].id, `${req.file.filename}.pdf`);
        res.redirect('/applied');
    } else {
        res.redirect('/');
    }

    db.disconnect();
});

module.exports = router;