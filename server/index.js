require('dotenv/config');
const express = require('express');
const path = require('path');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');
const classify = require('./classify');
const fs = require('fs');
const multer = require('multer');
const ownedDogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/images/ownedDogs'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });
const galleryUpload = multer({ storage: ownedDogStorage });

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('health-check');

  db.query('select \'successfully connected\' as "message"')
    .then(result => res.status(404).json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/breeds', (req, res, next) => {
  const queryStr = `select *
                      from "breeds"
                  order by "name" asc`;
  // eslint-disable-next-line no-console
  console.log('breeds1');
  db.query(queryStr)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/breeds/:breed', (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('breeds2');
  const queryStr = `select *
                    from "breeds"
                   where "name" = $1`;

  db.query(queryStr, [req.params.breed])
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/users', (req, res, next) => {
  const queryStr = `select *
                    from "users"`;

  db.query(queryStr)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/users/:userId', (req, res, next) => {
  const queryStr = `select *
                    from "users"
                   where "userId" = $1`;

  db.query(queryStr, [req.params.userId])
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/owned-dogs/:userId', (req, res, next) => {
  const userId = [Number(req.params.userId)];
  const sql = `
    select "breeds"."name" as "breed",
           "portraitUrl" as "imageUrl",
           "shortDescription",
           "longDescription",
           "temperament",
           "ownedDogs"."name",
           "historicalUsage",
           "ownedDogId",
           "breedId"
      from "ownedDogs"
      join "breeds" using ("breedId")
     where "userId" = $1
  order by lower("ownedDogs"."name") asc
  `;
  db.query(sql, userId)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/users/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  const { username, email } = req.body;

  if (!userId) return next(new ClientError('A userId is required', 400));

  if (isNaN(parseInt(userId)) || userId <= 0) {
    return next(new ClientError(`Expected a positive integer. ${userId} is not a valid user id.`, 400));
  }

  const sql = `
    UPDATE "users"
    SET "username"=$1, "email"=$2
    WHERE "userId"=$3
    `;
  const values = [username, email, userId];
  db.query(sql, values)
    .then(result => res.sendStatus(200))
    .catch(err => next(err));
});

app.put('/api/owned-dogs/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  const dogId = Number(req.body.dogId);
  const dogName = req.body.name;
  const dogBreed = req.body.breedId;
  if (!dogName) return res.status(400).json({ error: 'name is required' });

  const sql = `
      update "ownedDogs"
          set "name" = $1
         from "breeds"
        where "userId" = $2
          and "ownedDogId" = $3
          and "breeds"."breedId" = $4
    returning "breeds"."name" as "breed",
              "ownedDogs"."portraitUrl" as "imageUrl",
              "shortDescription",
              "longDescription",
              "temperament",
              "ownedDogs"."name",
              "historicalUsage",
              "ownedDogId",
              "breeds"."breedId";
  `;
  const values = [dogName, userId, dogId, dogBreed];

  db.query(sql, values)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.post('/api/edit-breed', (req, res, next) => {
  const {
    userId,
    apiKeyWord,
    currentOwnedDogId,
    classifiedBreedId,
    suggestedBreedId,
    imageUrl
  } = req.body;

  if (!userId) return next(new ClientError('A userId is required', 400));
  if (!classifiedBreedId) return next(new ClientError('A classifiedBreedId is required', 400));
  if (!suggestedBreedId) return next(new ClientError('A suggestedBreedId is required', 400));
  if (!apiKeyWord) return next(new ClientError('A apiKeyWord is required', 400));
  if (!imageUrl) return next(new ClientError('An image url is required', 400));

  if (isNaN(parseInt(userId)) || userId <= 0) {
    return next(new ClientError(`Expected a positive integer. ${userId} is not a valid user id.`, 400));
  }
  if (isNaN(parseInt(classifiedBreedId)) || classifiedBreedId <= 0) {
    return next(new ClientError(`Expected a positive integer. ${classifiedBreedId} is not a valid classified breed id.`, 400));
  }
  if (isNaN(parseInt(suggestedBreedId)) || suggestedBreedId <= 0) {
    return next(new ClientError(`Expected a positive integer. ${suggestedBreedId} is not a valid suggested breed id.`, 400));
  }

  if (classifiedBreedId === suggestedBreedId) {
    return next(new ClientError('Suggested breed id must be different than the classified breed id.', 400));
  }

  if (currentOwnedDogId) {
    const updateSql = `
      UPDATE "ownedDogs"
      SET "breedId" = $1, "apiKeyWord" = $2
      WHERE "ownedDogId" = $3
      RETURNING *`;
    const updateValues = [suggestedBreedId, apiKeyWord, currentOwnedDogId];
    db.query(updateSql, updateValues)
      .then(result => {
        const insertSql = `
        INSERT INTO "review" ("userId", "classifiedBreedId", "suggestedBreedId", "imageUrl")
        values ($1, $2, $3, $4)
        returning "reviewId", "suggestedBreedId"`;
        const insertValues = [userId, classifiedBreedId, suggestedBreedId, imageUrl];

        return db.query(insertSql, insertValues)
          .then(result => {
            return result.rows;
          })
          .catch(err => next(err));
      })
      .then(result => {
        const queryStr = `select *
                      from "breeds"
                     where "breedId" = $1`;
        db.query(queryStr, [result[0].suggestedBreedId])
          .then(innerResult => {
            res.json(innerResult.rows[0]);
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  } else {
    const insertSql = `
        INSERT INTO "review" ("userId", "classifiedBreedId", "suggestedBreedId", "imageUrl")
        values ($1, $2, $3, $4)
        returning "reviewId", "suggestedBreedId"`;
    const insertValues = [userId, classifiedBreedId, suggestedBreedId, imageUrl];

    db.query(insertSql, insertValues)
      .then(result => {
        const queryStr = `select *
                      from "breeds"
                     where "breedId" = $1`;
        db.query(queryStr, [suggestedBreedId])
          .then(innerResult => {
            res.json(innerResult.rows[0]);
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  }

});

app.post('/api/classify', upload.single('image'), (req, res, next) => {
  const imageToClassify = path.join(__dirname, `uploads/${req.file.filename}`);
  classify(imageToClassify)
    .then(result => {
      let label;
      if (result.label.split(' ').length === 1) {
        label = result.label[0].toUpperCase() + result.label.substring(1);
      } else {
        const splitLabel = result.label.split(' ');
        label = splitLabel.map(word => {
          return word[0].toUpperCase() + word.substring(1);
        }).join(' ');
      }
      const confidence = result.confidences[result.label];
      const sql = `
      select *
        from "breeds"
       where "name" = $1
      `;
      db.query(sql, [label])
        .then(result => {
          if (result.rows[0]) {
            res.status(200).json({
              label: label,
              confidence: confidence,
              info: result.rows[0]
            });
          } else {
            res.status(200).json({
              label: label,
              confidence: confidence,
              info: {}
            });
          }
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/owned-dogs/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  const breedId = Number(req.body.breedId);
  const name = req.body.name;
  const apiKeyWord = req.body.apiKeyWord;
  const portraitUrl = `/images/ownedDogs/${req.body.imageName}`;
  const sourcePath = path.join(__dirname, `/uploads/${req.body.imageName}`);
  const destinationPath = path.join(__dirname, `public/images/ownedDogs/${req.body.imageName}`);

  fs.readFile(sourcePath, (err, data) => {
    if (err) throw err;
    fs.writeFile(destinationPath, data, 'base64', err => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      process.stdout.write(`${req.body.imageName} is saved!`);
    });
  });

  const sql = `insert into "ownedDogs" ("userId","breedId", "name", "apiKeyWord", "portraitUrl")
               values ($1, $2, $3, $4, $5)
               returning *`;

  const values = [userId, breedId, name, apiKeyWord, portraitUrl];

  db.query(sql, values)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.delete('/api/owned-dogs/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  const dogId = Number(req.body.dogId);

  const sql = `
    delete from "ownedDogs"
          where "ownedDogId" = $1
            and "userId" = $2
      returning *;
  `;

  const values = [dogId, userId];

  db.query(sql, values)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/gallery/:dogId', (req, res, next) => {
  const dogId = Number(req.params.dogId);

  const sql = `
    select *
      from "ownedDogs"
     where "ownedDogId" = $1
  `;

  db.query(sql, [dogId])
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.post('/api/gallery/:dogId', galleryUpload.single('image'), (req, res, next) => {
  const ownedDogId = Number(req.params.dogId);
  const sql = `
  update "ownedDogs"
  set "uploadedPhotos" = array_cat("uploadedPhotos", $1)
  where "ownedDogId" = $2
  returning *
  `;
  const params = [`{/images/ownedDogs/${req.file.filename}}`, ownedDogId];
  db.query(sql, params)
    .then(result => res.json(result.rows[0]));
});

app.delete('/api/gallery', (req, res, next) => {
  const sql = `
  update "ownedDogs"
  set "uploadedPhotos" = array_remove("uploadedPhotos", $1)
  where "ownedDogId" = $2
  returning *
 `;
  const params = [req.body.imageUrl, req.body.dogId];
  db.query(sql, params)
    .then(result => res.json(result.rows[0]));
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
