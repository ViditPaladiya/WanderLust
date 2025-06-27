
const express = require ("express");
const router= express.Router(); 
const User = require("../models/user");
const wrapasync = require("../utils/wraasync")
const passport = require("passport");
const userController = require("../controller/user.js");
const {savedRedirectUrl} = require("../middleware.js");
router.get("/signup", (req,res)=>{
    res.render("users/signup.ejs");
});

// signup route 
router.post("/signup", wrapasync(userController.userSignup));





//login route already user exist 

router.get("/login", (req,res)=>{
    res.render("users/login.ejs");
})
router.post("/login",savedRedirectUrl,passport.authenticate("local", {failureRedirect: '/login', failureFlash:true }), userController.userCheckLogin// Passport provides an authenticate() function, which is used as route middleware to authenticate requests.
 );






//logout route
router.get("/logout", userController.userLogout);

module.exports = router;