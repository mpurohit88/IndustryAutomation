const express = require('express')
const Product = require('../controllers/product.js');

const productRouter = express.Router();

productRouter.post("/add", Product.add);
productRouter.get("/all", Product.all);

module.exports = productRouter;