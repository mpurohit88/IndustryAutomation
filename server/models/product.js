var connection = require("../lib/connection.js");
var Product = function(params){
    this.name = params.name,
    this.description =params.description,
    this.unit = params.unit,
		this.hsnCode = params.hsnCode,
		this.createdBy = 'mpurohi88'
		this.isActive = 1
};

Product.prototype.add = function(){
    const that = this;
    connection.getConnection(function(error, connection){
      return new Promise(function(resolve, reject) {
				console.log("error", error);
        console.log("connection", connection);

        connection.query('INSERT INTO product(name,description,unit,hsnCode,isActive,createdBy) VALUES ("'+that.name+'","'+that.description+'","'+that.unit+'","'+that.hsnCode+'","'+that.isActive+'","'+that.createdBy+'")', function(error,rows,fields){
         
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

module.exports = Product;