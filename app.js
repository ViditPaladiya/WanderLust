if(process.env.NODE_ENV != "production"){
require('dotenv').config(); // dotenv require for enviornment variable

}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const Listing = require("./models/listing.js");// getting schema from the model folder
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");// for creating layout and template 
//const wrapasync = require("./utils/wraasync.js"); // to get the exported wrapasync function for handling errror 
const ExpressError = require("./utils/expresserror.js");
//const { error } = require("console");
//const{listingSchema, reviewSchema} = require("./schema.js") ;//Joi copy data schema 
const Review = require("./models/review.js"); // getting schema from the model folder
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user"); // assuming this exports your mongoose User model

const listingRouter = require("./routes/listing.js");// importing the modules expoer structure code file from routes
const reviewRouter = require("./routes/review.js");// importing the modules expoer structure code file from routes
const userRouter = require("./routes/user.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');

//mongo connection 
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"//localhost

const dbUrl = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(dbUrl);
}

main().then(() => {
    console.log("connected")
})


app.engine('ejs', ejsMate);
//default code for EJS according to the file or folder names 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }))//bcoz all data will parse
app.use(methodOverride("_method"));//we use this because to make forms method to PUT
app.use(express.static(path.join(__dirname, "/public")));





const store = MongoStore.create({
     mongoUrl:dbUrl,
     crypto: {
    secret: process.env.SECRET,
  },
    touchAfter: 24 * 3600,

});
 store.on("error",()=>{
    console.log("ERROR",err);
}); 
const sessionOption = {
    store,
    secret: process.env.SECRET,  // dont let other see 
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() +  7 *24 * 60 *60 *1000, //1  week
        maxAge:  7 *24 * 60 *60 *1000, 
        httpOnly: true,                                    //CSS security
    },
}




app.get("/", (req, res) => {
    res.send("Myself root");
});


app.use(session(sessionOption));

app.use(flash());


//Passport authentication
app.use(passport.initialize()); // to implement passport we need to implement session bcoz within one session it cant ask user username and password again and again 
app.use(passport.session());//A web application needs the ability to identify users as they browse from page to page. This series of request and responses, each associated with the same user, is known as a session.
 
passport.use(new LocalStrategy(User.authenticate()));


// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





//using for flash message while creating listings
app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;      // we need to create locale because we cant access the req.user in ejs for verifying creating locals wwe can 
    //console.log(res.locals.success);
    next();
});


// //demo user
// app.get("/demouser",async (req,res)=>{

//      let fakeUSer = new User({
//         email: "abc@gmail.com",
//         username: "abc"
//      });

//     let registeredUser = await  User.register(fakeUSer,"helloworld");
//     res.send(registeredUser);
// })




app.use("/listings", listingRouter);  // it redirect the listing.js of route where whoever contain /listings

app.use("/listings/:id/reviews", reviewRouter);// it redirect the listing.js of route where whoever contain /listings/:id/reviews

app.use("/", userRouter);// it redirect the / of route where whoever contain /listings



//8 - habdling error part hanndling all errors
app.all(/.*/, (req, res, next) =>     // this star means it check all above conditions and it did't match any then this execute 
{   //it getting error if we are usng "*" of node_modules path-to-regexp bcoz of new express version 
    next(new ExpressError(404, "Page not Found!"));
});
app.use((err, req, res, next) => //Error handling middleware 
{
    let { statusCode = 500, message = "Something went wrong!" } = err;     // help for getting by by default express error 
    //res.status(statusCode).send(message);
    res.render("error.ejs", { err });
    // res.send("Something went Wrong")//this is to test wrapAsync class by puting price as number in database and passing string fom new listing form 
});





app.listen(8080, () => {//starting server to run our app  at 8080
    console.log("Server is running");
});






// app.get("/testListing", async (req , res) =>
// {
//    let sampleListing = new Listing({
//     title : "My villa",
//     description : "Paladiya's" ,  
//     price : 1200000,
//     location : "mellbourne",
//     country: "Australia"
//    });

//    await sampleListing.save();
//    console.log("Sample was saved");
//    res.send("Successful");
// });
