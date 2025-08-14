const {nanoid}=require("nanoid");
const {URL}=require("../models/url");


async function handlegennewshorturl(req,res){
    const body=req.body;
    if(!body.url)return res.status(404).json({error:"url is required"});

    const shortID=nanoid(8);
    await URL.create({
        shortid:shortID,
        redirectedURL:body.url,
        visitedhistory:[],
    })

    res.json({id:shortID});

}

const handleanalyticsfetch=async(req,res)=>{
    const shortID=req.params.shortid;

    const entry=await URL.findOne({shortid:shortID});
    res.json({
        count:entry.visithistory.length,
        analytics:entry.visithistory,
    })

}


module.exports={
    handlegennewshorturl,
    handleanalyticsfetch,
    
}