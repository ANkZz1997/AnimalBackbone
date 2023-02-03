var nodemailer = require('nodemailer');

module.exports = {


  friendlyName: 'Send mail',


  description: '',


  inputs: {
    email: {type: 'string'},
    subject: {type: 'string'},
    text: {type: 'string'},
    html: {type: 'string'},
  },


  exits: {

    success: {
      description: 'All done.',
    },
    fail: {
      description: 'Something went wrong',
    },

  },


  fn: async function (inputs) {
    const {email, subject, text, html} = inputs
    // TODO
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ahsan.ahmad@sdnatech.com',
        pass: 'zxqhcxlhztvdyqwb'
      }
    });
    const mailOptions = {
      from: 'ahsan.ahmad@sdnatech.com',
      to: email,
      subject,
      text,
      html
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return exits.fail(error);
      } else {
        console.log('Email sent: ' + info.response);
        return exits.success(info.response)
      }
    });
  }


};

