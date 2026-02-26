const express = require("express");
const app = express();
const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs', ejsMate);

app.use(express.urlencoded({extended: true}));
const mongoose = require("mongoose");
const { info } = require("console");

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/swiftstay');
}
main()
    .then(()=> console.log("connected to db"))
    .catch((err)=> console.log(err));

app.listen("8080" , ()=>{
    console.log("server running at 8080");
});

app.get("/" , (req,res)=>{
    res.send("root working fine");
});

// display all listings
app.get("/listings" , async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs" , {allListings});
});

//add new listing
app.get("/listings/new" , async(req,res)=>{
    res.render("./listings/new.ejs");
});
app.post("/listings/new/update", async (req,res)=>{
    const newListing = new Listing({...req.body});
    await newListing.save().then((res)=>console.log(res)).catch((err)=>console.log(err));
    res.redirect("/listings");
});

//delete the listing

app.get("/listings/:id/delete" , async(req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id).then((res)=>console.log(res));
    res.redirect("/listings");
});

//to get particular listing by id
app.get("/listings/:id" , async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs" , {listing});
});

//edit listing route
app.get("/listings/:id/edit" , async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs" , {listing});
});

app.post("/listings/update/:id" ,async (req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body});
    res.redirect("/listings");
});

