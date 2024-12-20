const User = require('../models/user')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {JWT_KEY} = require('../cred')

exports.signup = async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;
  
      const newUser = await User.create({ name, email, password, role});
      console.log(newUser);
  
      const { _id } = newUser;
      const token = jwt.sign({ _id }, JWT_KEY);
  
      res.setHeader("authorization", `Bearer ${token}`);
  
      res.status(201).json({
        status: "success",
        token,
        data: newUser,
      });
    } catch (err) {
      next(err);
    }
  };
  

  exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (user && (await user.matchPassword(password))) {
        const { _id } = user;
        const token = jwt.sign({ _id }, JWT_KEY);
  
        if (!token) throw new Error("No token");
  
        res.setHeader("authorization", `Bearer ${token}`);
  
        res.status(200).json({
          status: "success",
          token,
          data: user,
        });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      next(err);
    }
  };
  

  exports.logout= async (req, res,  next)=>{
    try{
    
        res.setHeader("authorization", "");
        res.status(201).json({
         status: "success",
         message: "user logged out successfull"
        })
     }
     
     catch(err){
         next(err)
       }
  }

  