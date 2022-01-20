
const nodemailer = require('nodemailer')
const mailSend = async (email, url) => {
   const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Password Link',
      html: `<!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml"
      <head>
         <meta charset="utf-8">
         <meta name="viewport" content="width=device-width">
         <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
         <style>
            p>a{
            border-radius: 5px;
            background: #449D44;
            color: white;
            padding: 5px 10px;
            display: inline-block;
            text-decoration : none;
            font-size: 22px;
            }
            body{
            font-family: 'Lato', sans-serif;
            font-weight: 400;
            font-size: 15px;
            line-height: 1.8;
            }
            span{
            color: #30e3ca;
            text-decoration : none;
            }
         </style>
      </head>
      <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
         <center style="width: 100%; background-color: #f1f1f1;">
            <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
            </div>
            <div style="max-width: 600px; margin: 0 auto;">
               <table align="center" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                  <tr>
                     <td  style="padding: 1em 2.5em 0 2.5em;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                           <tr>
                              <td style="text-align: center;">
                                 <h1><span>Reset Password</span></h1>
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
                  <tr>
                      <td style="text-align: center;">
                      <b><i class="far fa-envelope fa-5x "></i></b>
                      </td>
                  </tr>
                  <tr>
                     <td style="padding: 2em 0 4em 0; text-align: center;">
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                           <tr>
                              <td style="text-align: center;">
                                 <h2>Please click the above link</h2>
                                 <h3>Amazing deals, updates, interesting news right in your inbox</h3>
                                 <a href="${url}">${url}</a>
                              </td>
                           </tr>
                        </table>
                     </td>
                  </tr>
               </table>
            </div>
         </center>
      </body>
      </html>`
   }
   const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
         user: 'brian.little39@ethereal.email',
         pass: 'Am4ZkatmyusCB4bfgn'
      }
   });

   const res = await transporter.sendMail(mailOptions);
   if (!res) return { err: "Email send Failed !" }
   else return { info: res }
};


module.exports = { mailSend }