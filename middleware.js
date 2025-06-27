const Listing = require("./models/listing");
const Review = require("./models/review.js");

//for validation

const ExpressError = require("./utils/expresserror.js");
const{listingSchema,reviewSchema} = require("./schema.js") ;//Joi copy data schema 


//isLoggedIn is a function where we need to add in everywhere in route where the user logged in is necessay
//authentication middleware 
module.exports.isLoggedIn = (req,res,next)=>{
   

     req.session.redirectUrl = req.originalUrl;// it pass the original URl where the user wants to go but if not logged in then it  should go nd logged in and go to the req.original page from they left to logged in 

     if(!req.isAuthenticated()){//isAuthenticated() is a postman function to check the session loggged in or not 
        req.flash("error", "Must logged in before adding listing")
       return  res.redirect("/login");
    }
    next();
};

//authentication middleware 
module.exports.savedRedirectUrl = (req,res,next) =>{// we need to pass the req.session.redirectUrl to locals bcoz passport empty the session data once it logged in so our path got vanish 
     if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
     }

     next();
   };

//console.log(req.path, "..", req.originalUrl);  to check from where the  request coming and from where its going 


//authorization middleware 
module.exports.isOwner= async (req,res,next)=>{
       let { id } = req.params;
    let listing = await Listing.findById(id)
     if(!listing.owner._id.equals(res.locals.currUser._id)){     // listing owner is current user or not 
        req.flash("error","You don't have permission")
       return res.redirect(`/listings/${id}`)
     }
     next();
}


//validation listing  middleware 
//Joi
// //Schema validation from joi schema its different from mongoose schema 
module.exports.validateListing = (req,res,next)=>{
     let {error} = listingSchema.validate(req.body); // line for checking in joi schema's function 
 //  console.log(result);    
   if( error){
    let errMsg = error.details.map((el) => el.message).join(",");
     throw new ExpressError(400, errMsg );
}else{
    next();
}
}


//validation Reviews  middleware 
//Joi
// //Schema validation from joi schema its different from mongoose schema 
module.exports.validateReview = (req,res,next)=>{
     let {error} = reviewSchema.validate(req.body); // line for checking in joi schema's function 
   //console.log(result);    
   if( error){
    let errMsg = error.details.map((el) => el.message).join(",");
     throw new ExpressError(400, errMsg );
}else{
    next();
}
}



//authorization middleware 
module.exports.isReviewAuthor= async (req,res,next)=>{
       let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId)
     if(!review.author.equals(res.locals.currUser._id)){     // listing owner is current user or not 
        req.flash("error","You don't have permission")
       return res.redirect(`/listings/${id}`)
     }
     next();
};

// //Joi
// //Schema validation from joi schema its different from mongoose schema 
// const validateListing = (req,res,next)=>{
//      let {error} = listingSchema.validate(req.body); // line for checking in joi schema's function 
//  //  console.log(result);    
//    if( error){
//     let errMsg = error.details.map((el) => el.message).join(",");
//      throw new ExpressError(400, errMsg );
// }else{
//     next();
// }
// }





// //Joi
// //Schema validation from joi schema its different from mongoose schema 
// const validateReview = (req,res,next)=>{
//      let {error} = reviewSchema.validate(req.body); // line for checking in joi schema's function 
//    //console.log(result);    
//    if( error){
//     let errMsg = error.details.map((el) => el.message).join(",");
//      throw new ExpressError(400, errMsg );
// }else{
//     next();
// }
// }