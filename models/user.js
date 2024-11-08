const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name"]
    },
    email:{
        type:String,
        required: [true, "Please provide the email"],
        trim: true,
        unique: true,
        lowercase: true
   },
   password: {
    type: String,
    required: [true, "Please provide the password"],
    min: 6
   },
   role:{
    type: String,
    default: "user"
   }
   
})

const User=mongoose.model("User",userSchema);

module.exports=User;