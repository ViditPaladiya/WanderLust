// to follow the MVC design pattern or framework 
// we put all our callback function in the controller folder to look our vode more efficient and readable \
const Listing = require("../models/listing.js");// getting schema from the model folder
const Review = require("../models/review.js"); // getting schema from the model folder



//9 Review storing middleware   ONE TO MANY RELATION SHIP
module.exports.reviewStoring = async(req,res)=>
{
    console.log("Review Route: req.params.id =", req.params.id); // add this line

    let listing = await Listing.findById(req.params.id);   // fetching ID from listing 
    let newReview = new Review(req.body.review); //passsing the review related to that ID to database
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
       req.flash("success"," Review Saved! ");//using for flash message

     res.redirect(`/listings/${listing._id}`);
};



//10 Delete Review Route 
module.exports.reviewDelete = async(req,res)=>{
      let{id, reviewId} = req.params;
     await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});//$pull is a mongoose to pull the review which deleted from review table 
      await Review.findByIdAndDelete(reviewId);
    req.flash("success"," Review Deleted! ");//using for flash message

      res.redirect(`/listings/${id}`);
};











