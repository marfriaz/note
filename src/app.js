const express = require("express");
const cors = require("cors");

const PageRouter = require("./PageRouter");

// Express node framework to interpret HTTP requests and send HTTP responses
const app = express();

// Express middleware to enable CORS
app.use(cors());

// Defines server endpoint via express router
app.use("/notion/pages", PageRouter);

// Error Handler with useful JSON response
app.use(function errorHandler(error, req, res, next) {
  let response = {
    status: error.response.status,
    message: error.response.data.message,
  };

  res.status(error.response.status).json(response);
});

module.exports = app;
