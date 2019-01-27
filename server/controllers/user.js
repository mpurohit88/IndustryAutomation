const User = require("../models/user.js")

const register = function(req, res, next){
    let params = {
					company_name: req.body.company_name,
					name:req.body.name,
					designation: req.body.designation,
					area: req.body.area,
					address: req.body.address,
					mobNo: req.body.mobNo,
					isActive: req.body.isActive,
					email: req.body.email
			};
    const newUser = new User(params);

    try {
       newUser.register().then(function() {
		   res.send("success");
	   });
    } catch (err) {
			console.log("Error: ", err);
    }
};

module.exports = {register: register};