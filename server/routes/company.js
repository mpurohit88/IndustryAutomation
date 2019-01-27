const express = require('express')
const Company = require('../controllers/company.js');

const companyRouter = express.Router();

companyRouter.post("/register", Company.register);
companyRouter.get("/all", Company.all);

module.exports = companyRouter;