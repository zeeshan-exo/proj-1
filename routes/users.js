const express = require('express');
const auth = require('../controllers/auth')
const usercontroller = require('../controllers/user')
const router=express.Router();


//routes

router.route('/:id').patch(usercontroller.updateOne).delete( usercontroller.deleteOne).get(usercontroller.getOne)
router.route("/").get(auth.logout);
router.route("/signup").post(auth.signup)
router.route("/login").post(auth.login)

module.exports= router