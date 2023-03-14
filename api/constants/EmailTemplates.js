module.exports = {
  emailVerification: ``,
  welcomeEmail: {
    subject: (name)=>`Welcome ${name}`,
    content: (info) => `<!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <title>Welcome to ANIMAL CONCERT</title>
                </head>
                <body>
                  <h1 style="text-align: center; font-size: 36px; color: #006699;">Welcome to ANIMAL CONCERT</h1>
                  <p style="font-size: 18px;">Dear ${info.name},</p>
                  <p style="font-size: 18px;">We're excited to have you join the ANIMAL CONCERT family! Our company is dedicated to bringing you the best experience, and we know you're going to love what we have for you.</p>
                  <p style="font-size: 18px;">To get started, simply log in to your account and explore the site. You'll find information on NFT's, selling and buying options, and more. If you have any questions, feel free to contact us at support@sdnatech.com.</p>
                  <p style="font-size: 18px;">Thank you for choosing ANIMAL CONCERT, and we look forward to seeing you availing benefits of Animal Concert NFT Platform!</p>
                  <p style="font-size: 18px;">Best regards,<br>The ANIMAL CONCERT Team</p>
                </body>
              </html>`
  },

  forgotPassword:{
    subject: ()=>`Reset Your Password`,
    content: (info) => `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Animal Concert</title>
      <link rel="icon" href="favicon.png" type="image/png" sizes="16x16">
    </head>
    <body style="font-family: Open Sans,Helvetica,Arial,sans serif; margin:0;">
              
      <div align="center" style="background-color:#eaf0f2; width:100%; margin:auto; padding: 50px 0 20px;">
            <table border="0" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:600px; margin: 20px auto 0; text-align:center;">
              <tbody>
                  <tr>
                      <td>
                            <img src="${sails.config.custom.domain}/images/logo-icon.png" width="50px"></a>
                          <p style="font-size: 28px; line-height: 40px; margin: 15px 0;">
                                Hi <b>${info.name}</b>,<br>
                                We recently received a request to reset your password.   
                                
                            </p>

                           
                        </td>
                    </tr>
                </tbody>
            </table>
    
            <table border="0" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:600px; margin:auto; background-color:#fff; border-radius:5px; text-align: center;">
                <tbody>
                    <tr>
                        <td style="padding:30px 55px 46px;">
                            <img src="${sails.config.custom.domain}/images/email-icn.jpg" width="300px">
                            <p style="color:#474747; font-size:16px;">
                            Please use the following verification code to complete reset password.
                            </p>
                            <p style="width:100%;height:60px;border:2px solid #ccc;background:#e5e5e5;border-radius:15px;font-size:35px;font-weight:bold;padding:0 15px;line-height:1.7;margin:0;text-align:center;letter-spacing:3px;max-width:200px;display: inline-block;">
                              ${info.OTP}
                            </p>
                        </td>
                    </tr>
                </tbody>	
            </table>
    
            <table border="0" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:600px; margin:20px auto; background-color:#fff; border-radius:5px;">
                <tbody style="text-align: center;">
                    <tr>
                        <td style="padding:30px 55px 50px;">
                            <h1 style="font-size:26px; font-weight:normal;">Get the Animal Concert app!</h1>
                            <p style="color:#474747; font-size:16px; margin-bottom: 30px;">
                                Get the most of Animal Concert by installing the mobile app. You can log in by using your exsisting emails address an password.
                            </p>
                            <a href="" style="margin: 0 10px;"><img src="${sails.config.custom.domain}/images/app-store.png"></a> <a href="" style="margin: 0 10px;"><img src="${sails.config.custom.domain}/images/play-store.png"></a>
                        </td>
                    </tr>
                </tbody>	
            </table>
            
            <table border="0" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:600px; margin: 20px auto 0; text-align:center;">
              <tbody>
                  <tr>
                      <td>
                          <p>
                                <img src="${sails.config.custom.domain}/images/logo.png" width="150px">
                            </p>
                            
                          <a href="#" style="margin:0 10px;"><img src="${sails.config.custom.domain}/images/fb.png" width="35px"></a>
                            <a href="#" style="margin:0 10px;"><img src="${sails.config.custom.domain}/images/twitter.png" width="35px"></a>
                            <a href="#" style="margin:0 10px;"><img src="${sails.config.custom.domain}/images/linked-in.png" width="35px"></a>
    
                            <p style="color:#474747; font-size:14px; margin-bottom: 30px;">
                                Copyright © ${ new Date().getFullYear()}. All rights reserved.<br>
                                A better company begins with a personalised employee experience.                     
                </p>
                        </td>
                    </tr>
                </tbody>
            </table>
         </div>
    </body>
    </html>`
  }

}
