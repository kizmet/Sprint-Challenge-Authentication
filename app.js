const Knex = require("knex");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const knexConfig = require("./knexfile");
const promiseRouter = require("express-promise-router");
//router APIs
const AuthRouter = require("./auth/auth-routes");
const JokesRouter = require("./jokes/jokes-router.js");
//middleware
const authenticate = require("./auth/authenticate-middleware.js");
const { Model } = require("objection");

//const knex = Knex(knexConfig.development);
const knex = require("./database/dbConfig.js");

Model.knex(knex); //objection
const router = promiseRouter();
const jokesRouter = promiseRouter();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      callback(null, true);
    }
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.set("json spaces", 2);
app.use(helmet());
app.use("/api/auth", router);
app.use("/api/jokes", authenticate, jokesRouter);

AuthRouter(router);
JokesRouter(jokesRouter);

app.use((err, req, res, next) => {
  if (err) {
    res
      .status(err.statusCode || err.status || 500)
      .send(err.data || err.message || {});
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.json({ message: "API is up and running!" });
});

module.exports = app;
