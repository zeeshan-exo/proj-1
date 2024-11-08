const app=require("./app")
const mongoose = require("mongoose");
const { DB_CONN } = require("./cred");
const PORT = 3000;


mongoose.connect(DB_CONN).then(()=> console.log("MongoDB Connected")).catch((err)=>{
    console.error(err.message);
})

app.listen(PORT);