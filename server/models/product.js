const connection = require("../lib/connection.js");
let Product = function(params){
    this.name = params.name,
    this.description =params.description,
    this.unit = params.unit,
		this.hsnCode = params.hsnCode,
		this.createdBy = 'mpurohi88'
		this.isActive = 1
};

Product.prototype.add = function(){
	const that = this;
	return new Promise(function(resolve, reject) {
	connection.getConnection(function(error, connection){
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

Product.prototype.all = function(){
	return new Promise(function(resolve, reject) {
		connection.getConnection(function(error, connection){
			console.log("error", error);
			console.log("connection", connection);
			const isActive = 1;

			connection.query('select id, name, unit, hsnCode from product where isActive='+ isActive +'', function(error,rows,fields){
			 
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