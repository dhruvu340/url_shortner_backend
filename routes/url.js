const express = require("express");
const { handlegennewshorturl ,handleanalyticsfetch} = require("../controllers/url");
const router=express.Router();

router.post("/",handlegennewshorturl);
router.get("/analytics/:shortid",handleanalyticsfetch)

module.exports=router
    
