const mongoose = require('mongoose');

//WRITE SCHEMA
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const article = mongoose.model('Article',articleSchema);
module.exports = article;
