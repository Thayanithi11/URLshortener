const {nanoid}=require("nanoid");
const {URL}=require('../models/url');


const handlegenerateNewShortURL=async (req,res)=>{
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"URL required"})
    const shortID=nanoid(8);
    
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        visitHistory:[],
    });

    return res.render("home",{
        id:shortID,
    })
}

const handleRedirectToUrl=async (req,res)=>{
    const {x}=req.params
    const entry=await URL.findOneAndUpdate({shortId:x},{$push:{
        visitHistory:{
            timestamp:Date.now(),
        }
     }})
    res.redirect(entry.redirectURL)
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId
    const result=await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    })
}

const handleEmptyRequest=async(req,res)=>{
    const allUrls=await URL.find({})
    return res.render('home',{
       urls:allUrls,
    })
}

module.exports={handlegenerateNewShortURL,handleRedirectToUrl,
    handleGetAnalytics,handleEmptyRequest}