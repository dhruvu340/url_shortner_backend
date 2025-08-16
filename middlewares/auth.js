const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const User=require("../models/user");



passport.use(new LocalStrategy({ usernameField: 'email' },async(email,password,done)=>{
    try {
        const user=await User.findOne({email});
        if(!user) {
            return done(null,false,{message:"incorrect user"})
        }

        const passmatch=await user.comparepass(password);
        if(passmatch){return done(null,user)}
        else{return done(null,false,{message:"incorrect password"})}
        
    } catch (error) {

        return done(error);
        
    }
}))


const authmiddleware=passport.authenticate('local',{session:false});

module.exports={passport,authmiddleware};