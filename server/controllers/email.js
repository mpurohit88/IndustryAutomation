const { serverTrans } = require('./mailtransport');
const nodemailer = require('nodemailer');
const ActviityTaskHist = require("../models/activityTaskHist");
const EmailConfig = require("../models/emailConfig");

const send = function (req, res, next) {

  if (process.env.NODE_ENV === 'development') {
    var mail = {
      from: 'mpurohit88@gmail.com',
      to: 'mpurohit88@gmail.com',  //Change to email address that you want to receive messages on
      subject: 'New Message from Contact Form',
      text: req.body.message.body
    }

    serverTrans.sendMail(mail, (err, info) => {
      if (err) {
        console.log(err);
        res.status(200).send({ msg: "fail" });
      } else {
        // new ActviityTaskHist().complete(req.body.taskId).then(() => {
        //   if (req.body.nextTaskId) {
        //     new ActviityTaskHist().update(req.body.nextTaskId).then(() => {
        //       new ActviityTaskHist({}).getByActivityId([{ id: req.body.userActivityId }]).then(function (tasks) {
        //         res.status(200).send({ tasks: tasks });
        //       });
        //     });
        //   } else {
        new ActviityTaskHist({}).getByActivityId([{ id: req.body.userActivityId }]).then(function (tasks) {
          res.status(200).send({ tasks: tasks });
        });
        // }
        // });
      }
    });
  } else {
    new EmailConfig().readByCompanyId(req.decoded.companyId).then((data) => {
      var mail = {
        from: req.body.message.from,
        to: req.body.message.to,  //Change to email address that you want to receive messages on
        subject: req.body.message.subject,
        // attachments: [  
        //   {   
        //       filename: "identitycard.jpg",
        //       path:'./public/upload/'+pic,

        //       // content: fs.createReadStream(pic)
        //   }   ],
        text: req.body.message.body
      }

      serverTrans(data).sendMail(mail, (err, info) => {
        if (err) {
          console.log(err);
          res.status(200).send({ msg: "fail" });
        } else {
          new ActviityTaskHist().complete(req.body.taskId).then(() => {
            if (req.body.nextTaskId) {
              new ActviityTaskHist().update(req.body.nextTaskId).then(() => {
                new ActviityTaskHist({}).getByActivityId([{ id: req.body.userActivityId }]).then(function (tasks) {
                  res.status(200).send({ tasks: tasks });
                });
              });
            } else {
              new ActviityTaskHist({}).getByActivityId([{ id: req.body.userActivityId }]).then(function (tasks) {
                res.status(200).send({ tasks: tasks });
              });
            }

            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          });
        }
      })
    });
  }
};

module.exports = { send: send };