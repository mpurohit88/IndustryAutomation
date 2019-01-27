const express = require('express')
const Quote = require('../controllers/quote.js');

const quoteRouter = express.Router();

quoteRouter.post("/create", Quote.create);
quoteRouter.get("/all", Quote.all);

module.exports = quoteRouter;