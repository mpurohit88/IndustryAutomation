var User = require("../models/user.js")
var register = function(req, res, next){
    console.log('user data: ', req.body);
    var params = {
					company_name: req.body.company_name,
					name:req.body.name,
					designation: req.body.designation,
					area: req.body.area,
					address: req.body.address,
					mobNo: req.body.mobNo,
					isActive: req.body.isActive,
					email: req.body.email
			};
    var newUser = new User(params);

    try {
       newUser.register();
    } catch (err) {
			console.log("Error: ", err);
    }
};
module.exports = {register: register};