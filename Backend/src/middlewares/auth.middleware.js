const jwt= require ("jsonwebtoken")
const tokenBlacklistModel=require("../models/blacklist.model")


 async function authUser(req,res,next){
// const token=req.cookies.token
 const authHeader = req.headers.authorization;
if(!authHeader){
    return res.status(401).json({
        message:'Token not provided'
    })
}
 const token = authHeader.split(" ")[1];
const isTokenBlacklisted=await tokenBlacklistModel.findOne({token})
if(isTokenBlacklisted){
    return res.status(401).json({
        message:"Token is blacklisted, please login again"
    })
}
try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=decoded
     next();
}catch(err){
    return res.status(401).json({
        message:"Invalid Token"
    })
}

}

module.exports={authUser}