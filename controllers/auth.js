const User = require('../models/user')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {JWT_KEY} = require('../cred')

exports.signup= async(req,res)=>{
    try{
        
           const {name, email, password, role}= req.body;
 
       const newUser = await User.create({name,email,password, role});

       const {_id}=newUser

       const token= jwt.sign({_id},JWT_KEY);

       res.setHeader('authorization', `Bearer ${token}`);
       
       res.status(201).json({
        status: "success",
        token,
        data: newUser
       })
    }
    catch(err){
        res.status(400).json({
            status:"fail",
             message:err.message
            })
      }
  }

  exports.login= async(req, res)=>{
    try{
        const {email, password}= req.body;

        const user = await User.findOne({email});

            if(user && (await user.matchPassword(password))){
                const {_id}=user

                const token= jwt.sign({_id},JWT_KEY);
        
                res.setHeader('authorization', `Bearer ${token}`);
        
                if(!token) throw new Error("no token");
        
                res.status(201).json({
                 status: "success",
                 token,
                 data: user
                })
            }else{
                throw new Error("Something went wrong")
            }
            
       
     }

     catch(err){
         res.status(400).json({
             status:"fail",
              message:err.message
             })
       }
  }

  exports.logout= async (req, res)=>{
    try{
        res.setHeader('authorization',null);
        
        res.status(201).json({
         status: "success",
         message: "user logged out successfull"
        })
     }
     
     catch(err){
         res.status(400).json({
             status:"fail",
              message:err.message
             })
       }
  }

  