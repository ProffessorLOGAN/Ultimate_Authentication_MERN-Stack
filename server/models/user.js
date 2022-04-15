const mongoose = require("mongoose");
const crypto = require("crypto");
const { stringify } = require("querystring");
const { match } = require("assert");

//user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      max : 32
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique : true,
      lowercase: true
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: string,
    role: {
      type: string,
      default: "subscriber",
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

// virtual
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt - this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })

  .get(function () {
    return this._password;
  });

//methods
userSchema.methods = {
  authenticate: function (plaintext) {
    return this.encryptPassword(plainText) == this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update("password")
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Match.round(new Date().valueOf() * Math.randomm()) + "";
  },
};

module.exports = mongoose.model('User', userSchema);