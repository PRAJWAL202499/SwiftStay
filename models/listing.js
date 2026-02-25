let mongoose = require("mongoose");
let schema = mongoose.Schema;
const listingSchema = new schema({
    title : {
        type : String,
        required : true
    },
    description : String,
    image : {
        filename: {
            type: String,
            default: "listingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60" : v,
        }
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