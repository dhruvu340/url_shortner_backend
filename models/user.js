const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{type: String, required: true},
  },
  { timestamps: true }
);


//create a model of user as needed in auth service
git

const User=mongoose.model("User",userschema);
module.exports = User;
