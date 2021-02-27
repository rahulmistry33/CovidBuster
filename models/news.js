const mongoose = require('mongoose');
// SCHEMA CONSTRUCTOR FOR DEFINING DATABASE SCHEMA 
const schema = mongoose.Schema;

//DEFINING THE NEWS SCHEMA
const newsSchema = new schema({
    // id:{
    //     type:int,
    //     require:true
    // },
    title:{
        type:String,
        required:true
    },
    urlToImage:{
        type:String
    },
    content:{
        type:String,
        require:true
    },
    url:{
        type:String,
        require:true
    }

},{timestamps:true});
// TIMESTAMPS IS AN OPTIONS OBJECT THAT ASSIGNS TIMESTAMP TO EACH ITEM


//LINKING THE 'news' COLLECTION IN DB
const news = mongoose.model('news',newsSchema);
module.exports = news;
