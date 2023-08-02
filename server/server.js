import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import ClientError from './lib/client-error.js';
import errorMiddleware from './lib/error-middleware.js';
import authorizationMiddleware from './lib/authorization-middleware.js';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
  insert into "Users" ("username", "password")
    values ($1, $2)
    returning "userId", "username"
`;

    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  console.log('test');
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    console.log('test');

    const sql = `
      select "userId",
            "password"
        from "Users"
        where "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    console.log('test');

    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId } = user;
    const isMatching = await argon2.verify(user.password, password);

    if (!isMatching) {
      throw new ClientError(401, 'invalid login');
    }
    console.log('1');
    const payload = { userId, username };
    console.log(2);
    console.log(process.env.TOKEN_SECRET);
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);

    res.json({ token, user: payload });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.post('/api/trip', authorizationMiddleware, async (req, res, next) => {
  try {
    const { userId, eventName, startTime, eventSlug } = req.body;

    const sql = `
      insert into "Events" ("userId", "eventName", "startTime", "eventSlug", date) VALUES ($1, $2, $3, $4, NOW())
    `;

    const data = [userId, eventName, startTime, eventSlug];

    await db.query(sql, data);

    res.json({ message: 'success' }); // TODO send proper response
  } catch (err) {
    console.log(err);
    next(err);
  }
});

app.get('/api/trip', async (req, res) => {
  const { userId } = req.query;
  const sql = `
    SELECT * FROM "Events" WHERE "userId" = $1 ORDER BY "startTime" ASC;
  `;

  const data = [userId];

  const response = await db.query(sql, data);

  res.json(response.rows);
});

app.delete('/api/trip/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const sql = `
    DELETE FROM "Events" WHERE "eventId" = $1;
  `;

  const data = [id];

  try {
    const response = await db.query(sql, data);

    if (response.rowCount === 0) {
      // If no rows were deleted, it means the event with the provided ID does not exist
      res.status(404).json({ error: 'Event not found.' });
    } else {
      // If a row was deleted, it means the deletion was successful
      res.json({
        message: 'Event deleted successfully.',
        deletedEvent: response.rows[0],
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while deleting the event.' });
  }
});

app.put('/api/trip/:id', async (req, res) => {
  const { startTime } = req.body;
  const { id } = req.params;
  const sql = `
    UPDATE "Events" SET "startTime" = $1 WHERE "eventId" = $2 RETURNING *;
  `;

  const data = [startTime, id];

  try {
    const response = await db.query(sql, data);

    if (response.rowCount === 0) {
      // If no rows were updated, it means the event with the provided ID does not exist
      res.status(404).json({ error: 'Event not found.' });
    } else {
      // If a row was updated, it means the startTime column was updated for the event
      res.json({
        message: 'startTime updated successfully.',
        updatedEvent: response.rows[0],
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while updating the startTime.' });
  }
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.get('/api/get-logged-in-user', (req, res) => {
  const token = req.headers.authorization;
  console.log(token);

  // Verify the token
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      // Handle invalid or expired token
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Token is valid, retrieve the user data based on the decoded token
    const userId = decoded.userId;

    // TODO: Retrieve user data from your data store using the userId
    const sql = 'select * from "Users" where "userId" = $1';
    const params = [userId];

    const results = await db.query(sql, params);
    const user = results.rows[0];

    res.json(user);
  });
});

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
