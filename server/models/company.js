var connection = require("../lib/connection.js");
var Company = function(params){
    this.name = params.name,
    this.address =params.address,
    this.city = params.city,
    this.state = params.state,
    this.country = params.country,
    this.tele = params.tele,
    this.fax = params.fax,
    this.mobileNo =params.mobileNo,
    this.email = params.email,
    this.website = params.website,
    this.gstn = params.gstn,
    this.logo = params.logo,
    this.manufacturerOf = params.manufacturerOf,
    this.createdBy = 'mpurohi88'
    this.isActive = 1
};

Company.prototype.register = function(){
    const that = this;
    connection.getConnection(function(error, connection){
      return new Promise(function(resolve, reject) {
				console.log("error", error);
        console.log("connection", connection);

        connection.query('INSERT INTO company(name,address,city,state,country,tele,fax,mobileNo,email,website,gstn,logo,manufacturerOf,isActive,createdBy) VALUES ("'+that.name+'","'+that.address+'","'+that.city+'","'+that.state+'","'+that.country+'","'+that.tele+'","'+that.fax+'","'+that.mobileNo+'","'+that.email+'","'+that.website+'","'+that.gstn+'","'+that.logo+'","'+that.manufacturerOf+'","'+that.isActive+'","'+that.createdBy+'")', function(error,rows,fields){
         
            if(!error){ 
              resolve(rows);
            } else {
							console.log("Error...", error);
							reject(error);
						}

            connection.release();
            console.log('Process Complete %d',connection.threadId);
          });
			});
    });
};

module.exports = Company;