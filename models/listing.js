// model means 	Interface to interact with the collection 
// For example if there is a table and it has many entities rather they are of  STRING or NUMBER etc 
// It is created based on a schema, which defines what fields your data should have.
// Once you have a model, you can create, read, update, and delete (CRUD) data in the database.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;     // For not writting mongoose.Schema everywhere  
const Review = require("./review.js");
const listingSchema = new Schema({
    
      title: {
      type:    String,
      required:true
        },

      description: String,




      
image: {
  url:String,
  filename: String,
  // filename: {
  //   type: String,
  //   default: 'listingimage'
  // },

  // url: {
  //   type: String,
  //   default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   set: (v) =>
  //     v === ""
  //       ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  //       : v
  // }
},





      price:Number,
      location:String,
      country:String,
//Definig schema of our model that how our model datas will be stored in there 
       reviews:[
        {
          type: Schema.Types.ObjectId,//Schema.Types.ObjectId special type for relationships 
          ref: "Review" //take reference of model Review 
        },
       ],
       owner: {
          type:  Schema.Types.ObjectId,
          ref: "User",
       },
}); 

listingSchema.post("findOneAndDelete",async(listing)=>
{
  if(listing){
    
   await Review.deleteMany({_id: {$in: listing.reviews}})

  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
