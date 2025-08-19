const express=require("express");
const app=express();

const urlRoute=require("./routes/url");
const {connecttodb}=require("./connect")
const {URL}=require("./models/url")
const path=require("path");
const mailer=require("./controllers/sendmail")
require("dotenv").config();
const port=3000;

const staticrouter=require("./routes/staticrouter")
const userrouter=require("./routes/user");
const {passport }= require("./middlewares/auth");



connecttodb(process.env.MONGO_URL).then(()=>{
    console.log("connected to database");
    
})

app.set("view engine","ejs")
app.set("views",path.resolve("./views"));



app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(passport.initialize());
app.get("/mail",mailer);

app.use("/url",urlRoute);
app.use("/",staticrouter);
app.use("/user",userrouter)

app.get("/url/:id",async (req,res)=>{
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