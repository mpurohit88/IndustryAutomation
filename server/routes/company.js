const express = require('express')
const Company = require('../controllers/company.js');

const companyRouter = express.Router();

companyRouter.post("/register", Company.register);

module.exports = companyRouter;