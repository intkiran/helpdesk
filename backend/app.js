const express = require("express");
const bodyParser = require("body-parser");
var database = require("./database.js");
let middleware = require("./config/middleware");

const router = express.Router();

const users = require("./routes/user.route"); // Imports routes for the users
const auth = require("./routes/auth.route"); // Imports routes for the auth
const tickets = require("./routes/ticket.route"); // Imports routes for the users

let port = 2000;
const app = express();
//catch mongodb error
app.use((request, response, next) => {
  if (database.connection.readyState != 1) {
    var err = new Error("Failed to connect to mongodb!");
    err.status = 500;
    next(err);
  } else {
    next();
  }
});

var showRequestBody = function(req, res, next) {
  "use strict";
  console.debug(
    "Request Body",
    require("util").inspect(req.body, { depth: null })
  );
  next();
};
app.use(showRequestBody);
// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
//db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use("/", route);
app.use("/api/users", middleware.checkToken, users);
app.use("/api/tickets", middleware.checkToken, tickets);

app.use("/api/auth", auth);

app.listen(port, () => {
  console.log("Web server is up and running at " + port);
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //  res.render("error");
  res.json({
    message: err.message,
    error: err
  });
});

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node docs)
});
