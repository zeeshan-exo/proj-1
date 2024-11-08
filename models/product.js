const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
      type: String,
      unique: true

    },
    company:{
        type: String
    },
    price:{
        type: Number
    },
    details:{
        type: String
    },
})

const products = mongoose.model("Products", productSchema)

module.exports = products