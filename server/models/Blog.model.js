const mongoose = require('mongoose') 

const Schema = mongoose.Schema

let Blog = new Schema ({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    fullname:{
        type: String
    },
    email: {
        type: String
    },
    summary: {
        type: String
    },
    description: {
        type: String
    },
    likedBy:{
        type : Array,
        default: []
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikedBy:{
        type: Array,
        default: []
    },
    dislikes:{
        type : Number,
        default: 0
    },
    timestamp:{
        type : Number
    },
    image_url: {
        type: String
    },
    comments: [{
        comment : {type: String},
        commentator : {type : String}
    }]
})

module.exports = mongoose.model('Blog', Blog)