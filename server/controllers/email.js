const Quote = require('../controllers/quote.js');
var trans= require('./mailtransport');
const nodemailer = require('nodemailer');

const send = function(req, res, next){
    console.log("*********send email*******", req.body);

    var mail = {
        from: 'reminder@somiconveyor.com',
        to: 'mpurohit88@gmail.com',  //Change to email address that you want to receive messages on
        subject: 'Test email, please ignore',
        // attachments: [  
        //   {   
        //       filename: "identitycard.jpg",
        //       path:'./public/upload/'+pic,
               
        //       // content: fs.createReadStream(pic)
        //   }   ],
        text: 'Testing'
      }
    
      trans().sendMail(mail, (err, info) => {
        if (err) {
          console.log(err);
          res.status(200).send({msg:"fail"});
      } else
      {
        console.log('Message sent: %s', info.messageId);
        res.status(200).send({msg:"success"});
      }
      
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      })
};

module.exports = {send: send};