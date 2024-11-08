const express = require('express');
const User = require('../models/user');
const auth = require('../controllers/auth')
const usercontroller = require('../controllers/user')
const router=express.Router();


//routes
router.route("/signup").post(auth.signup)
router.route("/login").post(auth.login)

router.route('/user/:id').patch( usercontroller.updateOne ).delete( usercontroller.deleteOne).get(usercontroller.getOne)

module.exports= router