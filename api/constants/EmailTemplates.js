module.exports = {
  emailVerification: ``,
  welcomeEmail: {
    subject: (name)=>`Welcome ${name}`,
    content: (info) => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>${info.platformTitle}</title>
	<link rel="icon" href="favicon.png" type="image/png" sizes="16x16">
</head>
<body style="font-family: Open Sans,Helvetica,Arial,sans serif; margin:0;">
        	
	<div align="center" style="background-color:#eaf0f2; width:100%; margin:auto; padding: 50px 0 20px;">
        <table border="0" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:600px; margin: 20px auto 0; text-align:center;">
        	<tbody>
            	<tr>
                	<td>
                        <img src="${sails.config.custom.mediaUrl}/${info.platformLogo}" width="50px"></a>
                    	<p style="font-size: 28px; line-height: 40px; margin: 15px 0;">
                            Hi <b>${info.name}</b>,<br>
                            Your ${info.platformTitle} account has been register!
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
                           Your ${info.platformTitle} account has been register and you can now log in to the ${info.platformTitle} network.
                        </p>
                        <hr style="margin:25px 70px; border-top:none; border-color: #ddd;">
                        <p style="color:#474747; font-size:16px; margin-bottom: 30px;">
                          
                            You can access ${info.platformTitle} online or any deivce by going to
                            <a href="${sails.config.custom.websiteDomain}" style="color:#01b0f1; text-decoration: none;">${sails.config.custom.websiteDomain}</a><br>
                        </p>
                        <a href="${sails.config.custom.websiteDomain}" style="display: inline-block; background:#532df5; border: none; border-radius: 50px; color: #fff; text-decoration: none; padding: 10px 30px;">Get started</a>
                    </td>
                </tr>
            </tbody>	
        </table>

        <table border="0" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:600px; margin:20px auto; background-color:#fff; border-radius:5px;">
            <tbody style="text-align: center;">
                <tr>
                    <td style="padding:30px 55px 50px;">
                        <h1 style="font-size:26px; font-weight:normal;">Get the ${info.platformTitle} app!</h1>
                        <p style="color:#474747; font-size:16px; margin-bottom: 30px;">
                            Get the most of ${info.platformTitle} by installing the mobile app. You can log in by using your exsisting emails address an password.
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
                            <img src="${sails.config.custom.mediaUrl}/${info.platformLogo}" width="150px">
                        </p>
                        
                    	<a href="#" style="margin:0 10px;"><img src="${sails.config.custom.domain}/images/fb.png" width="35px"></a>
                        <a href="#" style="margin:0 10px;"><img src="${sails.config.custom.domain}/images/twitter.png" width="35px"></a>
                        <a href="#" style="margin:0 10px;"><img src="${sails.config.custom.domain}/images/linked-in.png" width="35px"></a>

                        <p style="color:#474747; font-size:14px; margin-bottom: 30px;">
                            Copyright © 2023. All rights reserved.<br>
                            A better company begins with a personalised employee experience.                     
						</p>
                    </td>
                </tr>
            </tbody>
        </table>
     </div>
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
      <title>${info.platformTitle}</title>
      <link rel="icon" href="favicon.png" type="image/png" sizes="16x16">
    </head>
    <body style="font-family: Open Sans,Helvetica,Arial,sans serif; margin:0;">
              
      <div align="center" style="background-color:#eaf0f2; width:100%; margin:auto; padding: 50px 0 20px;">
            <table border="0" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:600px; margin: 20px auto 0; text-align:center;">
              <tbody>
                  <tr>
                      <td>
                            <img src="${sails.config.custom.mediaUrl}/${info.platformLogo}" width="50px"></a>
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
                            <h1 style="font-size:26px; font-weight:normal;">Get the ${info.platformTitle} app!</h1>
                            <p style="color:#474747; font-size:16px; margin-bottom: 30px;">
                                Get the most of ${info.platformTitle} by installing the mobile app. You can log in by using your exsisting emails address an password.
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
                                <img src="${sails.config.custom.mediaUrl}/${info.platformLogo}" width="150px">
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
  },

  thankyouEmail:{
    subject: ()=>`Thank You for Contacting Us!`,
    content: (info) => `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${info.platformTitle}</title>
      <link rel="icon" href="favicon.png" type="image/png" sizes="16x16">
    </head>
    <body style="font-family: Open Sans,Helvetica,Arial,sans serif; margin:0;">
              
      <div align="center" style="background-color:#eaf0f2; width:100%; margin:auto; padding: 50px 0 20px;">
            <table border="0" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:600px; margin: 20px auto 0; text-align:center;">
              <tbody>
                  <tr>
                      <td>
                            <img src="${sails.config.custom.mediaUrl}/${info.platformLogo}" width="50px"></a>
                          <p style="font-size: 28px; line-height: 40px; margin: 15px 0;">
                                Hi <b>${info.name}</b>, 
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
                            I wanted to take a moment to thank you for reaching out to us through our Contact Us form.
                            </p>

                            <p style="color:#474747; font-size:16px;">
                            Our team has received your message and will do our best to respond to you as soon as possible. We understand the importance of timely communication and will strive to provide you with the information you need in a timely manner.
                            </p>

                            <p style="color:#474747; font-size:16px;">
                            Thank you again for taking the time to get in touch with us. We value your input and look forward to the opportunity to assist you in any way we can.
                            </p>
                        </td>
                    </tr>
                </tbody>	
            </table>
    
            <table border="0" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:600px; margin:20px auto; background-color:#fff; border-radius:5px;">
                <tbody style="text-align: center;">
                    <tr>
                        <td style="padding:30px 55px 50px;">
                            <h1 style="font-size:26px; font-weight:normal;">Get the ${info.platformTitle} app!</h1>
                            <p style="color:#474747; font-size:16px; margin-bottom: 30px;">
                                Get the most of ${info.platformTitle} by installing the mobile app. You can log in by using your exsisting emails address an password.
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
                                <img src="${sails.config.custom.mediaUrl}/${info.platformLogo}" width="150px">
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
  },

  contactusEmail:{
    subject: ()=>`Contact Us`,
    content: (info) => `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${info.platformTitle}</title>
      <link rel="icon" href="favicon.png" type="image/png" sizes="16x16">
    </head>
    <body style="font-family: Open Sans,Helvetica,Arial,sans serif; margin:0;">
              
      <div align="center" style="background-color:#eaf0f2; width:100%; margin:auto; padding: 50px 0 20px;">
            <table border="0" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:600px; margin: 20px auto 0; text-align:center;">
              <tbody>
                  <tr>
                      <td>
                            <img src="${sails.config.custom.mediaUrl}/${info.platformLogo}" width="50px"></a>
                            <p style="font-size: 28px; line-height: 40px; margin: 15px 0;">
                                Hi <b>Dear</b>,<br>
                                we received an new query from contact us form.  
                            </p>

                           
                        </td>
                    </tr>
                </tbody>
            </table>
    
            <table border="0" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:600px; margin:auto; background-color:#fff; border-radius:5px; text-align: center;">
                <tbody>
                    <tr>
                        <td style="padding:30px 55px 46px;">
                            <p style="color:#474747; font-size:16px;">
                                Name: ${info.name} <br>
                                Email: ${info.email} <br>
                                Phone Number : ${info.phoneNumber} <br>
                            </p>

                            <p style="color:#474747; font-size:16px;">
                            ${info.message}
                            </p>
                            
                        </td>
                    </tr>
                </tbody>	
            </table>
    
            <table border="0" cellpadding="0" cellspacing="0" align="center" style="width:100%; max-width:600px; margin: 20px auto 0; text-align:center;">
              <tbody>
                  <tr>
                      <td>
                          <p>
                                <img src="${sails.config.custom.mediaUrl}/${info.platformLogo}" width="150px">
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
