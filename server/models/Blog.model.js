const mongoose = require('mongoose') 

const Schema = mongoose.Schema

let Blog = new Schema ({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    summary: {
        type: String
    },
    description: {
        type: String
    },
    likes_count: {
        type: Number
    },
    timestamp:{
        type : Number
    },
    image_url: {
        type: String
    }
})

module.exports = mongoose.model('Blog', Blog)