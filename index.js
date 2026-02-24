const express = require("express");
const app = express();

const mongoose = require("mongoose");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
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