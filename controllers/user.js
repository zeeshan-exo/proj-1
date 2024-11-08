const User = require('../models/user')

//get all users
exports.getAll =async(req, res)=>{
 
    try{
      const users = await User.find();

      if(!users) throw new Error("data not found")

      res.status(200).json(users)
    }
    catch(err){
      res.status(500).json({
          success:false,
           message:err.message
          })
    }
  }

  //get user
exports.getOne =async(req, res)=>{
  try{
    const {id} = req.params.id
    const user = await User.findById({id});
    if(!user) throw new Error("user not found")
    res.status(200).json({
    status: false,
    user,
  })
  }
  catch(err){
    res.status(500).json({
        success:false,
         message:err.message
        })
  }
}
//update users
exports.updateOne=async(req, res) => {
    const {id} = req.params; 
    try{
      console.log("patch function is running")
      const{name, email, password} = req.body;
      const updateUser= await User.findByIdAndUpdate(id, {name, email, password},{
         new :true
      });
      
      if(!updateUser){
        throw new Error("user not found")
      }
      res.status(200).json({
         success: true,
         data: updateUser
      })
  
    }
    catch(err){
      // console.log(err)
       res.status(500).json({
        success:false,
        messsage: err.message
       })
    }
  }
//del user
  exports.deleteOne = async(req, res)=>{
    const {id} = req.params;
     try{
      
       const deleteUser = await User.findByIdAndDelete(id)
  
       if(!deleteUser){
        throw new Error("user not found")
       }
       res.status(200).json({
        success:true,
        data: deleteUser
       })
     }
     catch(err){
      res.status(500).json({
       success:false,
       messsage: err.message
      })
   }
  }