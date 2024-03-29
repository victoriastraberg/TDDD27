var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

/* Initialize our routers */
var fridgeAPIRouter = require("./routes/fridgeAPI");
var recipeAPIRouter = require("./routes/recipesAPI");
var shoppinglistAPIRouter = require("./routes/shoppinglistAPI");

var app = express();

/* View engine setup */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

/* The Express App's routes */
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/fridgeAPI", fridgeAPIRouter);
app.use("/recipesAPI", recipeAPIRouter);
app.use("/shoppinglistAPI", shoppinglistAPIRouter);

/* Catch 404 and forward to error handler */
app.use(function (req, res, next) {
  next(createError(404));
});

/* Error handler */
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
