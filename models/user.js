const mongoose=require("mongoose")
const bcrypt = require("bcrypt");

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

userSchema.methods.matchPassword = async function (enteredPass){
    return await bcrypt.compare(enteredPass, this.password)
}

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User=mongoose.model("User",userSchema);

module.exports=User;