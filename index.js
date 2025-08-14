const express=require("express");
const app=express();
const urlRoute=require("./routes/url");
const {connecttodb}=require("./connect")
const {URL}=require("./models/url")
require("dotenv").config();
const port=3000;

connecttodb(process.env.MONGO_URL).then(()=>{
    console.log("connected to database");
    
})


app.use(express.json());

app.use("/url",urlRoute);
app.get("/:id",async (req,res)=>{
    const shortID=req.params.id;
    const entry=await URL.findOneAndUpdate({shortid:shortID},{
        $push:{
            visithistory:{
                timestamp:Date.now(),
            }
        }
    },{ new: true })

        if (!entry) {
      return res.status(404).send("Short URL not found");
    }
    
    res.redirect(entry.redirectedURL);

})
app.listen(port,()=>{
console.log("App is running on port 3000");

})