const mongoose = require("mongoose");
const sampleListings = require("./data.js");

const listing  = require("../models/listing.js");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/swiftstay');
}
main()
    .then(()=> console.log("connected to db"))
    .catch((err)=> console.log(err));
console.log(sampleListings);

const initDB = async()=>{
    await listing.deleteMany({});
    await listing.insertMany(sampleListings.data).then((res)=>console.log(res)).catch((err)=>console.log(err));
};

initDB();
