const express = require('express')
const Customer = require('../controllers/customer.js');

const customerRouter = express.Router();

customerRouter.post("/add", Customer.add);
customerRouter.get("/all", Customer.all);

module.exports = customerRouter;