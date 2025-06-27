// to follow the MVC design pattern or framework 
// we put all our callback function in the controller folder to look our vode more efficient and readable \
//const Listing = require("../models/listing");

const User = require("../models/user");


// signup route 

module.exports.userSignup = async(req,res)=>{
    try{
    let {username,email,password} = req.body;
    const newUser = new User({email, username});
    const registerUser = await User.register(newUser, password);
    console.log(registerUser);
    req.login(registerUser,(err)=>{   // login and logout both are passport method for login and logout from using sesssion 
      //this help to login just after the user perform the sugn up 
        if(err){
            return next(err);
        }
         req.flash("success","Welcome to WanderLust");
    res.redirect("/listings");

    });    
   

    }catch(err){
    req.flash("error",err.message);
    res.redirect("/signup");

    }

};





//logout route

module.exports.userLogout = (req,res)=>
{
    req.logOut((err)=>{// req.logout is also a passport functionality which logut the user from the session 
      if(err){
        next(err);
      }
       req.flash("success","Bye Bye! come back soon!");
       res.redirect("/listings");
    });
};


//Check login
module.exports.userCheckLogin = async(req,res)=>{ // Passport provides an authenticate() function, which is used as route middleware to authenticate requests.

    req.flash("success","Welcome to WanderLust");
    let redirectUrl = res.locals.redirectUrl  || "/listings";//res.locals.redirectUrl --->>what ever there the user left to logged in it came back there only 
    res.redirect(redirectUrl);
};





