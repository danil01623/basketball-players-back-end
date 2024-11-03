const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users-routes");
const playerRoutes = require("./routes/players-routes");
const HttpError = require("./models/http-error");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETED");
  next();
});

app.use("/api/players", playerRoutes);

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(
    "mongodb+srv://dimitris:aK46K0kUsudS47GJ@b-labs.l82xnpz.mongodb.net/b-labs-locally?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected!!!");
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
