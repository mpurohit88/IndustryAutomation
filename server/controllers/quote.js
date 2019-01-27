const Quote = require("../models/quote.js")

const create = function(req, res, next){
    console.log("********************", req.body);
    let params = {
        party_name: req.body.quote.party_name, 
        address: req.body.quote.address,
        phoneNo: req.body.quote.phoneNo,
        mobileNo: req.body.quote.mobileNo,
        products: req.body.productList
    };
            
    const newQuote = new Quote(params);

    try {
       newQuote.create().then(function() {
		   res.send("success");
	   });
    } catch (err) {
			console.log("Error: ", err);
    }
};

module.exports = {create: create};