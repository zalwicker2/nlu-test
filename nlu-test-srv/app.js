const express = require('express');
const multer = require('multer')

const upload = multer();

const { body, validationResult } = require('express-validator')

const app = express();

const cors = require('cors');
app.use(cors({
    origin: '*',
    credentials: true
}));

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:')

const setupDB = require('./setup-db')
setupDB(db);

//
app.get('/flavors', (req, res) => {
    db.serialize(() => {
        db.all(`
            SELECT DISTINCT CategoryId, Category FROM flavors
        `, (err, result) => {
            if (err) {
                res.json({ error: err.message });
            } else {
                res.json(result);
            }
        })
    })
});

// getters for the flavors in a category
app.get('/flavors/:category', (req, res) => {
    const category = req.params.category
    db.serialize(() => {
        db.all(`
        SELECT Id, Name, Category, CategoryId FROM flavors WHERE CategoryId='${category}'
            `, (err, result) => {
            if (err) {
                res.json({ error: err.message });
            } else {
                res.json(result);
            }
        })
    })
})

// validation for form input
const validate = () => [
    body('name')
        .notEmpty().withMessage('Please fill out the name field.')
        .isAlpha('en-US', { ignore: /\s+/ }).withMessage('Name must only include letters and spaces.')
        .trim(),
    body('email')
        .notEmpty().withMessage('Please fill out the email field.')
        .isEmail().withMessage('Email must be a proper email.')
        .trim(),
    body('capability')
        .notEmpty().withMessage('Please select a capability.')
        .isIn(['design', 'production', 'certification']).withMessage('Please select a valid capability.'),
    body('comments')
        .optional({ checkFalsy: true })
        .isAlphanumeric('en-US', { ignore: ' ' }).withMessage('Comments must be alphanumeric.')
        .trim(),
]

app.post('/quote', upload.none(), validate(), (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        const data = req.body;
        const newsletter = data.newsletter != null; // convert newsletter to boolean
        db.serialize(() => {
            db.run(`
                INSERT INTO quote_requests
                VALUES ('${data.name}', '${data.email}', '${data.capability}', '${data.comments}', '${newsletter}')
            `)
        })
        res.json({ status: 200, msg: 'Data successfully submitted!' })
    } else {
        const errorMessage = result.array().map(e => e.msg).join(' ');
        res.json({ status: 400, msg: 'Failed to validate: ' + errorMessage })
    }
});

// used to view what's currently in the database
app.get('/quote', (req, res) => {
    db.serialize(() => {
        db.all(`
            SELECT * FROM quote_requests
        `, (err, result) => {
            if (err) {
                res.json({ error: err.message });
            } else {
                res.json(result);
            }
        })
    })
})

app.listen(80, () => {
    console.log("Listening on port 80")
})