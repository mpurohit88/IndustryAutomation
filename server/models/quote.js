var connection = require("../lib/connection.js");
var Quote = function(params){
   this.party_name = params.party_name;
   this.address = params.address;
   this.phoneNo = params.phoneNo;
   this.mobileNo = params.mobileNo;
   this.isActive = 1
   this.createdBy = 'mpurohit88',
   this.products = params.products
};

Quote.prototype.create = function(){
  const that = this;
  return new Promise(function(resolve, reject) {
  connection.getConnection(function(error, connection){
    if (error) {
		throw error;
    }
    
    let values = [
      [that.party_name, that.address, that.phoneNo, that.mobileNo, that.isActive, that.createdBy]
    ]

    connection.query('INSERT INTO quote(party_name,address,phoneNo,mobileNo,isActive,createdBy) VALUES ?', [values], function(error,rows,fields){
      
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

module.exports = Quote;