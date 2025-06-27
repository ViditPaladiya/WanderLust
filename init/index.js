const mongoose = require("mongoose");
const initData = require ("./data.js");
const Listing = require("../models/listing.js");


// to run our chatgpt genersted data initially !!
//mongo connection 
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"
async function main(){
    await mongoose.connect(MONGO_URL);
}
main().then(() =>{
    console.log("connected")
})


const initDB = async () => {
     await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=> ({...obj, owner:"685d720c723446a68d0ab47e"}));// to add the owner manually to all the listing availatblle 
    await Listing.insertMany(initData.data);
     console.log("data entered")
}

initDB();