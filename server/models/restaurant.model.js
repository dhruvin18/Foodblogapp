const mongoose=require('mongoose');

var restoSchema= new mongoose.Schema({
    _id: Number,
    name: String,
    cuisines: String,
    address: String,
    timings: String,
    costfortwo: String,
    locality: String,
    highlights: [String],
    rating: String,
    image: String,
    phoneNumbers: String,
    establishment: [String],
    url: String
});

mongoose.model('Restaurant', restoSchema);