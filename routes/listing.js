// hee we are making external routes means putting same page routes in one file to makreour code look clen app,js and easy to understand 

const express = require ("express");
const router= express.Router();
const wrapasync = require("../utils/wraasync.js"); // to get the exported wrapasync function for handling errror 
const ExpressError = require("../utils/expresserror.js");
const{listingSchema} = require("../schema.js") ;//Joi copy data schema 
const Listing = require("../models/listing.js");// getting schema from the model folder
const {isLoggedIn} = require("../middleware.js");
const {isOwner, validateListing} = require("../middleware.js");
// app -> router 
const listingController = require("../controller/listing.js");
// for images multipart 
const multer  = require('multer');

const {storage} = require("../cloudConfig.js");// it contain cloudinary code

const upload = multer({ storage }); //muter makes to store image docs photo etc in local storage 
 //multer store the images to func storage in cloudinary


//at last we configure the same request in on route.route 


router.route("/")    // we make a common request which are coming to / 
// 1 index route
.get( wrapasync(listingController.index))// 1 index route
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapasync(listingController.createRoute));//4  Create Route after adding in 3rd route it redirect to this route 
// .post(upload.single('listing[image][url]'),(req,res)=>{
//   res.send(req.file);
// })



//3 adding new place new  Route---> after submit it goes to create route 

router.get("/new", isLoggedIn,listingController.newFormListing
   // (req, res) => {
    //console.log(req.user);
    // if(!req.isAuthenticated()){//isAuthenticated() is a postman function to check the session loggged in or not 
    //     req.flash("error", "Must logged in before adding listing")
    //    return  res.redirect("/login");
    // } we created middle ware instead of writting everywhere in all edit new etc(isLoggedIn)
   // res.render("../views/listings/new.ejs");
//}
);









router.route("/:id")   // we make a common request which are coming to /:id  
.get( wrapasync(listingController.showListing))//2 Show Route means clicking on specific place 
.put(isLoggedIn,isOwner,upload.single('listing[image]'), validateListing ,listingController.updateListing)//6 Update Route ater clicking Edit button 
.delete( isLoggedIn,isOwner,wrapasync(listingController.deleteListing));//7 Delete place by id



//5 Edit Route to update any place with its ID
router.get("/:id/edit",isLoggedIn,isOwner, validateListing , wrapasync(listingController.editListing));



// // 1 index route
// router.get("/", wrapasync(listingController.index));









// //2 Show Route means clicking on specific place 
// router.get("/:id", wrapasync(listingController.showListing));




// //4  Create Route after adding in 3rd route it redirect to this route 
// router.post("/",isLoggedIn, validateListing ,wrapasync(listingController.createRoute));
// // try{

// // }
// // catch (err){next(err);}










// //6 Update Route ater clicking Edit button 
// router.put("/:id",isLoggedIn,isOwner,listingController.updateListing);




// //7 Delete place by id
// router.delete("/:id", isLoggedIn,isOwner,wrapasync(listingController.deleteListing));



module.exports = router; 