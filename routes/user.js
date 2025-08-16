const express=require("express");
const {handleusersignup,handleuserlogin}=require("../controllers/user")
const router= express.Router();
//auth middleware
router.post('/',handleusersignup)
router.post('/login',handleuserlogin)

module.exports=router