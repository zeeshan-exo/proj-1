const express = require("express");
const product = require("./routes/product")
const user = require("./routes/users");

//code execution starts

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/user', user);
app.use('/api/product',product);


module.exports=app







// fisrt way of imorting and exporting
// module.exports=logging
// const logging=require("./middelware.js")
// logging()



// second way of importing and exporting modiles
// exports.logging=logging
// exports.signup=signup
// exports.login=login
// const  middelware=require("./middelware.js")
//middelware.loggin()