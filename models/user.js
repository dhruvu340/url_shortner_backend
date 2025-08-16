const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userschema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{type: String, required: true},
  },
  { timestamps: true }
);

userschema.pre('save',async function(next){
  const person=this;
  if(!this.isModified('password'))return next();
  try {

    const salt= await bcrypt.genSalt(10);
    const hashpass=await bcrypt.hash(person.password,salt);
    person.password=hashpass;
    next()
    
    
  } catch (error) {
    return next(error);
    
  }
})


userschema.methods.comparepass=async function(candidatepass){
  try {
    const ismatch=await bcrypt.compare(candidatepass,this.password);
    return ismatch;
    
  } catch (error) {
    throw(error)
  }
}



//create a model of user as needed in auth service


const User=mongoose.model("User",userschema);
module.exports = User;
