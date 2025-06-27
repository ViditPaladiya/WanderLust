// to follow the MVC design pattern or framework 
// we put all our callback function in the controller folder to look our vode more efficient and readable \
const Listing = require("../models/listing");




// 1 index route
module.exports.index=(async (req, res, next) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});


 
//3 adding new place new  Route---> after submit it goes to create route 

module.exports.newFormListing = (req, res) => {
    //console.log(req.user);
    // if(!req.isAuthenticated()){//isAuthenticated() is a postman function to check the session loggged in or not 
    //     req.flash("error", "Must logged in before adding listing")
    //    return  res.redirect("/login");
    // } we created middle ware instead of writting everywhere in all edit new etc(isLoggedIn)
   res.render("../views/listings/new.ejs");
}



//2 Show Route means clicking on specific place 
module.exports.showListing =  (async (req, res) => {
    let {id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews", populate:{path:"author",},}).populate("owner"); // Populate because to see the all datas of Review which vreated one to many relationship 
    
     if(!listing){    // if requested listing does't exist than it show the error flash
         req.flash("error"," Requested place does't exist ");//using for flash message
         return res.redirect("/listings");
     }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
});



//4  Create Route after adding in 3rd route it redirect to this route 
module.exports.createRoute = (async (req, res, next) => { //validateListing is a function for joi schema testing
      let url = req.file.path;
      let filename = req.file.filename;
      //console.log(url,"..", filename);
    // let {title , description , image , price, country , location} = req.body;

     const newlisting = new Listing(req.body.listing);
     newlisting.owner = req.user._id;
     newlisting.image = {url,filename};
    await newlisting.save();
    req.flash("success","New Listing Created!");//using for flash message
    res.redirect("/listings");
    // here we used wrapasync but it also done by -> // try catch block to handle the error if error occured than it directly redirect to the next(err) middleware whch it handle the error it called that 
})





//5 Edit Route to update any place with its ID
module.exports.editListing = (async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
      if(!listing){    // if requested listing does't exist than it show the error flash
         req.flash("error"," Requested place does't exist ");//using for flash message
         return res.redirect("/listings");
     }

    res.render("listings/edit.ejs", { listing });
});







//6 Update Route ater clicking Edit button 
module.exports.updateListing =  async (req, res) => {
    let { id } = req.params;
    // let listing = await Listing.findById(id) {{we made middleware}}
    //  if(!currUser && listing.owner._id.equals(res.locals.currUser._id)){     // listing owner is current user or not 
    //     req.flash("error","You don't have permission")
    //    return req.redirect(`/listings/${id}`)
    //  }
    let listing =  await Listing.findByIdAndUpdate(id, { ...req.body.listing });//..req.body.listing is a JAvascript object contain all Parameters use to pass as a new updated values  

     if(typeof req.file !== "undefined"){
     let url = req.file.path;  // for upload photo from local
      let filename = req.file.filename;// for upload photo from local
      listing.image = {url,filename};// for upload photo from local
      await listing.save();// for upload photo from local
     }


    req.flash("success"," updated! ");//using for flash message

    res.redirect(`/listings/${id}`);
};




//7 Delete place by id
module.exports.deleteListing = (async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success"," Listing Deleted! ");//using for flash message
    res.redirect("/listings");

})




