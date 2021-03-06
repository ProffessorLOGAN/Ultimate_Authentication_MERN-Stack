const User = require("../models/user");
const jwt = require("jsonwebtoken");

//sender id
const { sendEmailwithNodemailer } = require("../helpers/email");

// nodeM.setApiKey(process.env.NODEMAILER_API_KEY);

// exports.signup = (req, res) => {
//   // console.log("REQ BODY ON SIGNUP", req.body);
//   const { name, email, password } = req.body;

//   User.findOne({ email: email }).exec((err, user) => {
//     if (user) {
//       return res.status(400).json({
//         error: "Email is taken",
//       });
//     }
//   });

//   let newUser = User({ name, email, password });

//   newUser.save((err, success) => {
//     if (err) {
//       console.log("SIGNUP ERROR", err);
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     res.json({
//       message: "Signup success! Please signin",
//     });
//   });
// };

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }
    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Account activation link`,
      html: `
                <p> Please use the following link to activate your account </p>
                <p> http://localhost:3000/auth/activate/${token}</p>
                <hr/>
                <p>This email may contain sensitive information </p>
                <p>${process.env.CLIENT_URL}</p>
                `,
    };
    sendEmailwithNodemailer(req, res, emailData);

    // const emailData = {
    //     from: process.env.EMAIL_FROM,
    //     to: email,
    //     subject: `Account activation link`,
    //     html: `
    //               <p> Please use the following link to activate your account </p>
    //               <p> ${process.env.CLIENT_URL}/${token}</p>
    //               <hr/>
    //               <p>This email may contain sensitive information </p>
    //               <p>${process.env.CLIENT_URL}</p>
    //               `,
    // };

    // sgMail.send(emailData)
    // .then((sent) => {
    //     //console.log('SIGNUP EMAIL SENT',sent);
    //     return res.json({
    //         message:`Email has been sent to ${email}. Follow the instruction to activate your account.`,
    //              });
    //             })
    //             .catch((err) => {
    //                 //console.log('SIGNUP EMAIL SENT ERROR,err);
    //                 return res.json({
    //                     message:err.message,
    //                 });
    //             });
  });
};

exports.accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err);
          return res.status(401).json({
            error: "Expired link. Signup again",
          });
        }

        const { name, email, password } = jwt.decode(token);

        const user = new User({ name, email, password });

        user.save((err, user) => {
          if (err) {
            console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err);
            return res.status(401).json({
              error: "Error saving user in database. Try Signup agian",
            });
          }
          return res.json({
            message: "Signup success. Please Signin",
          });
        });
      }
    );
  } else {
    return res.json({
      message: "Something went wrong. Try again.",
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exists. Please signup",
      });
    }

    //authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }

    // generate a token and send to cleint
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { _id, name, email, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};
