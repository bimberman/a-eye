require('dotenv/config');
const express = require('express');
const path = require('path');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const classify = require('./classify');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/breeds', (req, res, next) => {

  const queryStr = `select *
                    from "breeds"`;

  db.query(queryStr)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/breeds', (req, res, next) => {

  const queryStr = `select "breed"
                    from "dogBreeds"`;

  db.query(queryStr)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/owned-dogs/:userId', (req, res, next) => {
  const userId = [Number(req.params.userId)];
  const sql = `
    select "breed",
           "imageUrl",
           "shortDescription",
           "longDescription",
           "temperament",
           "name",
           "historicalUsage"
      from "ownedDogs"
      join "dogBreeds" using ("breedId")
     where "userId" = $1;
  `;
  db.query(sql, userId)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});


app.post('/api/classify', upload.single('image'), (req, res, next) => {
  classify(path.join(__dirname, `uploads/${req.file.filename}`))
    .then(result => res.status(200).json(result))
    .catch(err => next(err));

app.post('/api/owned-dogs/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  const breedId = Number(req.body.breedId);
  const name = req.body.name;

  const sql = `
    insert into "ownedDogs" ("userId","breedId", "name")
         values ($1, $2, $3)
      returning *;
  `;

  const values = [userId, breedId, name];

  db.query(sql, values)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
