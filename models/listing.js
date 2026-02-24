let mongoose = require("mongoose");
let schema = mongoose.Schema;
const listingSchema = new schema({
    title : {
        type : String,
        required : true
    },
    description : String,
    image : {
        type : String,
        set : (v) => v === "" ? "https://pixabay.com/images/search/travel/" : v,
    },
    price : {
        type : Number,
        default : 100
    },
    location : String,
    country : String
});

const listing = mongoose.model("listing" , listingSchema);

module.exports = listing;