const product= require('../models/product')
const User=require("../models/user")
const jwt=require("jsonwebtoken")
const {JWT_KEY}=require("../cred")
//create product
exports.createProduct=async(req,res)=>{

    try{
       const {name, company, price, details}= req.body;
       
       const newProduct = await product.create({name, company, price, details});
       //console.log(req.headers.authorization.split(" ")[1])
       const usertoken=req.headers.authorization.split(" ")[1];

       const payload=jwt.verify(usertoken,JWT_KEY)

       const user=await User.find({_id:payload._id});

       if(!user){
        throw new Error("Invalid Token")
       }

       res.status(200).json({
        status: "success",
        data: newProduct
       })
    }
    catch(err){ 
        res.status(400).json({
            status:"fail",
             message:err.message
            })
      }
}
//get product
exports.getProduct = async(req, res)=>{
 
    try{
      const newproduct = await product.find();

      res.status(200).json({
        status: "success",
        message: newproduct
       })
    }
    catch(err){
      res.status(500).json({
          success:false,
           message:err.message
          })
    }
  }
//update product
  exports.updateProduct = async(req, res) => {
    const {id} = req.params;
  
    
    try{
      const{name, company, price, details} = req.body;
      const updateProduct= await product.findByIdAndUpdate(id, {name, company, price, details},{
         new :true
      });
      
      if(!updateProduct){
        res.json({
          message: "Product not found"
        })
      }
      res.status(200).json({
         success: true,
         user: updateProduct
      })
  
    }
    catch(err){
       res.status(500).json({
        success:false,
        messsage: err.message
       })
    }
  }
//del product
  exports.deleteProduct =  async(req, res)=>{
    const {id} = req.params;
     try{
      
       const deleteProduct = await product.findByIdAndDelete(id)
  
       if(!deleteProduct){
        res.json({
          message:"Product not found"
        })
       }
       res.status(200).json({
        success:true,
        user: deleteProduct
       })
     }
     catch(err){
      res.status(500).json({
       success:false,
       messsage: err.message
      })
   }
  }

  
 
