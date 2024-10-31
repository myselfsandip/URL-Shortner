import { nanoid } from "nanoid";
import URL from "../models/url.js";

import { genarateNewShortUrlSchema,idInputSchema } from "../schema.js";


export const handleGenarateNewShortUrl = async (req, res) => {
    try {
        // input validation with zod
        const createPayload = req.body;
        const parsedPayload = genarateNewShortUrlSchema.safeParse(createPayload);
        if(!parsedPayload.success) {
            return res.json({success:false,msg:"You send the wrong input"});
        }
        const url = req.body.url;
        const shortId = nanoid(6);
        const newUrl = await URL.create({shortId,redirectUrl:url,visitHistory:[]});
        return res.status(201).json({success:true,newUrl});
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false,msg:"Internal Server Error"});
    }
}

export const handleRedirectToOriginalUrl = async function(req,res){
    try {
        const {id} = req.params;
        // input validation with zod
        const createPayload = req.params;
        const parsedPayload = idInputSchema.safeParse(createPayload);
        if(!parsedPayload.success) {
            return res.json({success:false,msg:"You send the wrong input"});
        }
        // if(!id) return res.json({success:false,msg:"Url id is required"});
        const url = await URL.findOne({shortId:id});
        if(!url) return res.json({success:false,msg:"Invalid Url!"});
        url.visitHistory.push({timestamp:Date.now()});
        await url.save();
        return res.redirect(url.redirectUrl);
    } catch (error) {
        console.log(error);
        res.json({success:false,msg:"Internal Server Error"});
    }
}

export const handleUrlClickAnalytics = async function(req,res) {
    try {
        const {id} = req.params;
        // input validation with zod
        const createPayload = req.params;
        const parsedPayload = idInputSchema.safeParse(createPayload);
        if(!parsedPayload.success) {
            return res.json({success:false,msg:"You send the wrong input"});
        }
        const url = await URL.findOne({shortId:id});
        if(!url) return res.json({success:false,msg:"Invalid Url!"});
        const urlVisitedCount = url.visitHistory.length;
        return res.json({success:true,urlVisitedCount});
    } catch (error) {
        console.log(error);
        res.json({success:false,msg:"Internal Server Error"});
    }
}
