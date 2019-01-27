const Company = require("../models/company.js")

const register = function(req, res, next){
    let params = {
					name: req.body.name,
					address:req.body.address,
					city: req.body.city,
					state: req.body.state,
					country: req.body.country,
                    tele: req.body.tele,
                    fax: req.body.fax,
					mobileNo:req.body.mobileNo,
					email: req.body.email,
					website: req.body.website,
					gstn: req.body.gstn,
					logo: req.body.logo,
					manufacturerOf: req.body.manufacturerOf,
			};
    const newCompany = new Company(params);

    try {
       newCompany.register();
    } catch (err) {
			console.log("Error: ", err);
    }
};

module.exports = {register: register};