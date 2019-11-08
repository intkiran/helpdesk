const express = require("express");
const bodyParser = require("body-parser");
var database = require("./database.js");

const router = express.Router();
//const route = require("./routes/route");
const product = require("./routes/product.route"); // Imports routes for the products
const users = require("./routes/user.route"); // Imports routes for the products

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
  console.log(
    "REQUEST BODY",
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
    "X-Requested-With,content-type"
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
app.use("/products", product);
app.use("/api/users", users);

app.listen(port, () => {
  console.log("router " + app);

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
  res.render("error");
});

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node docs)
});
