const nodeMailer = require('nodemailer');

exports.sendEmailwithNodemailer = (req,res,emailData) => {
  const transporter = nodeMailer.createTransport({
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
    requireTLS : true,
    auth : {
      user : process.env.EMAIL_TO,
      pass : process.env.NODEMAILER_API_KEY,
    },
    tls : {
      ciphers : "SSLv3",
    },
  });

  return transporter
  .sendMail(emailData)
  .then((info) => {
    console.log(`message sent : ${info.response}`);
    return res.json({
      message : `Email has been sent to your email. Follow the instruction to activate your account `,
    });
    })
    .catch((err) => 
      console.log(`Problem sending email : ${err}`));
   
  
  };
