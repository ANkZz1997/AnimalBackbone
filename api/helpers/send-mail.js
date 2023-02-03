var nodemailer = require('nodemailer');

module.exports = {


  friendlyName: 'Send mail',


  description: '',


  inputs: {
    subject: {type: 'string'},
    text: {type: 'string'},
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    const {subject, text} = inputs
    // TODO
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ahsan.ahmad@sdnatech.com',
        pass: 'joqgor-4mydce-vecQuc'
      }
    });
    const mailOptions = {
      from: 'your.email@gmail.com',
      to: 'recipient.email@example.com',
      subject,
      text
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.serverError(error);
      } else {
        console.log('Email sent: ' + info.response);
        return res.ok();
      }
    });
  }


};

