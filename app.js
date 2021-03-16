const express = require('express');
const app = express();
const path = require('path');

const news = require('./models/news');
const NewsAPI = require('newsapi');

const loginController = require('./controllers/login_controller');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/sessions',
    collection: 'mySessions'
});
app.use(session({
    secret: 'prac',
    resave: false,
    saveUninitialized: false,
    store: store 
}));

const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect('/login');
    }
}

//REGISTERING VIEW ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE & STATIC FILES
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));

// SETTING UP API-KEY LINK WITHT THE NEWS-API
const newsapi = new NewsAPI('a8720d66af5749479e06c45ec5ff5a92');


app.use('/login', loginController);

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


//ROUTE FOR MAP PAGE
app.get('/map',(req,res)=>{
    res.render('map');
});

app.get('/profile', isAuth, (req, res) => {
    res.render('profile');
});


//ERROR ROUTE CUSTOM
app.use((req, res) => {
    res.render('error');
});

const PORT = 3000;
//SETTING UP THE PORT
app.listen(PORT, () => {
	console.log(`Server started listening on port ${PORT}`);
});


