module.exports = {
  emailVerification: ``,
  welcomeEmail: {
    subject: (name)=>`Welcome ${name}`,
    content: (name) => `<!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <title>Welcome to ANIMAL CONCERT</title>
                </head>
                <body>
                  <h1 style="text-align: center; font-size: 36px; color: #006699;">Welcome to ANIMAL CONCERT</h1>
                  <p style="font-size: 18px;">Dear ${name},</p>
                  <p style="font-size: 18px;">We're excited to have you join the ANIMAL CONCERT family! Our company is dedicated to bringing you the best experience, and we know you're going to love what we have for you.</p>
                  <p style="font-size: 18px;">To get started, simply log in to your account and explore the site. You'll find information on NFT's, selling and buying options, and more. If you have any questions, feel free to contact us at support@sdnatech.com.</p>
                  <p style="font-size: 18px;">Thank you for choosing ANIMAL CONCERT, and we look forward to seeing you availing benefits of Animal Concert NFT Platform!</p>
                  <p style="font-size: 18px;">Best regards,<br>The ANIMAL CONCERT Team</p>
                </body>
              </html>`
  },

}
