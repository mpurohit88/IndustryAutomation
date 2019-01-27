const Product = require("../models/product.js")

const add = function(req, res, next){
    let params = {
					name: req.body.name,
					description:req.body.description,
					unit: req.body.unit,
					hsnCode: req.body.hsnCode
			};
    const newProduct = new Product(params);

    try {
       newProduct.add();
    } catch (err) {
			console.log("Error: ", err);
    }
};

module.exports = {add: add};