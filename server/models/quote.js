var connection = require("../lib/connection.js");
var Quote = function(params){
   this.party_name = params.party_name;
   this.address = params.address;
   this.phoneNo = params.phoneNo;
   this.mobileNo = params.mobileNo;
   this.isActive = 1;
   this.status = 1;
   this.createdBy = params.createdBy,
   this.products = params.products;
};

Quote.prototype.create = function(){
  const that = this;
  return new Promise(function(resolve, reject) {
  connection.getConnection(function(error, connection){
    if (error) {
		throw error;
    }
    
    let values = [
      [that.party_name, that.address, that.phoneNo, that.mobileNo, that.status, that.isActive, that.createdBy]
    ]

    connection.query('INSERT INTO quote(party_id,address,phoneNo,mobileNo,status,isActive,createdBy) VALUES ?', [values], function(error,rows,fields){
      
        if(error) reject(error);

        let quote_id = rows.insertId;

        let productValues = [
        ];

        that.products.map((product) => {
            productValues.push([quote_id, product.product_id, product.qty, product.gst, that.isActive, that.createdBy])
        });

        connection.query('INSERT INTO quote_product(quote_id,product_id,quantity,gstn,isActive,createdBy) VALUES ?', [productValues], function(error,productRows,fields){
      
            if(!error){ 
                resolve({'quote_id': quote_id});
            } else {
            console.log("Error...", error);
                reject(error)
            }

            connection.release();
            console.log('Process Complete %d',connection.threadId);
        });
      });
    });
  });
};

Quote.prototype.all = function() {
  return new Promise(function(resolve, reject) {
    connection.getConnection(function(error, connection){
      if (error) {
        throw error;
      }

      const isActive = 1;

			connection.query('select id, party_id, address, phoneNo, mobileNo, status, dateTimeCreated from quote where isActive=?', [isActive], function(error,rows,fields){
			 
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
}


Quote.prototype.allByUserId = function(userId) {
  return new Promise(function(resolve, reject) {
    connection.getConnection(function(error, connection){
      if (error) {
        throw error;
      }

      const isActive = 1;

			connection.query('select id, party_id, address, phoneNo, mobileNo, status, dateTimeCreated from quote where isActive=? and createdBy=?', [isActive, userId], function(error,rows,fields){
			 
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
}

module.exports = Quote;