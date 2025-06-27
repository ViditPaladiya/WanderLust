
const mongoose = require("mongoose");
const Schema = mongoose.Schema;     // For not writting mongoose.Schema everywhere  

// for taking review of hotel/listing one to many relationship 
const reviewSchema = new Schema({
    comment: String,
    rating:{

        type: Number,
        min: 1,
        max: 5,
    },
     createdAt:{
        type: Date,
        default: Date.now()
     },
     author:{
        type: Schema.Types.ObjectId,
        ref:"User",
     },
});

module.exports = mongoose.model("Review", reviewSchema)