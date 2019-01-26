var connection = require("../lib/connection.js");
var User = function(params){
   this.email = params.email;
   this.company_id = params.company_name,
   this.name = params.name,
   this.designation = params.designation,
   this.area = params.area,
   this.address = params.address,
   this.mobNo = params.mobNo,
   this.isActive = params.isActive
   this.createdBy = 'mpurohit88'
};

User.prototype.register = function(newUser){
    const that = this;
    connection.getConnection(function(error, connection){
      return new Promise(function(resolve, reject) {
				console.log("error", error);
        console.log("connection", connection);

        connection.query('INSERT INTO user(companyId,name,designation,address,area,mobileNo,email,isActive,createdBy) VALUES ("'+that.company_id+'","'+that.name+'","'+that.designation+'","'+that.address+'","'+that.area+'","' + that.mobNo +'","'+that.email+'","'+that.isActive+'","'+that.createdBy+'")', function(error,rows,fields){
         
            if(!error){ 
              resolve(rows);
            } else {
							console.log("Error...", error);
							reject(error)
						}

            connection.release();
            console.log('Process Complete %d',connection.threadId);
          });
			});
    });
};

module.exports = User;