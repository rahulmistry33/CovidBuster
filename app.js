const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const news = require('./models/news');
const bodyParser = require('body-parser');

const NewsAPI = require('newsapi');



// DATABASE CONNECTION
// RETURN A PROMISE
// WHEN CONNECTION IS ESTABLISHED,ONLY THEN THE SERVER STARTS



//CONNECTION USING MONGODB CLOUD...UNCOMMENT IF NEEDED.
// const dbURI = 'mongodb+srv://rahulmistry:rahul123@covid-buster.z3xlk.mongodb.net/covid-buster?retryWrites=true&w=majority';
// mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
//         .then((result) => app.listen(3000, () => {
//             console.log('Server is listening');
//         }))
//         .catch((err) => console.log(err));
 



//REGISTERING VIEW ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE & STATIC FILES
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// SETTING UP API-KEY LINK WITHT THE NEWS-API
const newsapi = new NewsAPI('a8720d66af5749479e06c45ec5ff5a92');

//ROUTE FOR CLEARING COOKIES
app.get('/clear_cookies', (req, res) => {
    res.clearCookie('name');
    console.log('Coockies cleared!');
    res.render('index');
});

//ROUTE FOR COOKIES
app.get('/get_cookies', (req, res) => {
    console.log(req.cookies);
});


//INDEX ROUTE
app.get('/', (req, res) => {
    // console.log('Hello there!');
    res.render('index');
});

// ROUTE WHEN NEWS BUTTON IS CLICKED
app.get('/news', (req, res) => {
    newsapi.v2.topHeadlines({
        q: 'covid',
        language: 'en',
      }).then(response => {
        // console.log(response);
        res.render('news', {response:response.articles});
      });
    
});

//ROUTE FOR LOGIN PAGE
app.get('/Login', (req, res) => {
    console.log("Redirected to login page");
    res.render('login');
});


//ROUTE FOR MAP PAGE
app.get('/map',(req,res)=>{
    res.render('map');
});




//ERROR ROUTE CUSTOM
app.use((req, res) => {
    res.render('error');
});


//SETTING UP THE PORT
app.listen(PORT, () => {
	console.log(`Server started listening on port ${PORT}`);
});


