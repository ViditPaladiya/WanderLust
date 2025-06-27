
const express = require ("express");
const router= express.Router({ mergeParams: true });   // mergeParams is new verion error it takes me 40 min to solve this 
//When we are using nested routes { mergeParams: true } is essentials  
const wrapasync = require("../utils/wraasync.js"); // to get the exported wrapasync function for handling errror 
const ExpressError = require("../utils/expresserror.js");

const{reviewSchema} = require("../schema.js") ;//Joi copy data schema 
const Review = require("../models/review.js"); // getting schema from the model folder
const Listing = require("../models/listing.js");// getting schema from the model folder
const{validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controller/reviews.js");



//isLoggedIn specially for hopscoch


//9 Review storing middleware   ONE TO MANY RELATION SHIP
router.post("/",isLoggedIn, validateReview, wrapasync(reviewController.reviewStoring));

//10 Delete Review Route 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapasync (reviewController.reviewDelete));

module.exports = router;
