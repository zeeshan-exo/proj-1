const jwt=require("jsonwebtoken")
const User = require("../models/user")
const {JWT_KEY} = require('../cred')

const protect =  async function (req,res,next){
    let token;
     // console.log(req.headers);
     if(req.headers.authorization&&req.headers.authorization.startsWith("Bearer")){
         token=req.headers.authorization.split(" ")[1];
     }
     if(!token){
         return res.status(401).json({
             status:"fail",
             data:'You are not logged in please login again to get access'
         })
     }
     
     const decoded=jwt.verify(token,JWT_KEY);
    //  console.log(decoded)
     const currentUser=await User.findById(decoded._id);
     if(!currentUser){
         return res.status(401).json({
             status:"fail",
             data:'The user belong to this token does no longer exist'
         })
     }
   
 req.user=currentUser;

 next() 
 }

 
 
exports.protection = protect
