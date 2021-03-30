const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const news = require('./models/article');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')


// const news = require('./models/news');


const NewsAPI = require('newsapi');
const article = require('./models/article');

const loginController = require('./controllers/login_controller');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/covidBuster',
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


// SETTING UP API-KEY LINK WITHT THE NEWS-API
const newsapi = new NewsAPI('a8720d66af5749479e06c45ec5ff5a92');


app.use('/login', loginController);


//INDEX ROUTE
app.get('/', (req, res) => {
    res.render('index', { username: req.session.username });
});

// ROUTE WHEN NEWS BUTTON IS CLICKED
app.get('/news', (req, res) => {
    newsapi.v2.topHeadlines({
        q: 'covid',
        language: 'en',
      }).then(response => {
        // console.log(response);
        res.render('news', { response: response.articles });
      });
    
});


//ROUTE FOR BLOG PAGE
app.get('/articles',(req,res) => {
        
        article.find({},(err,articles)=>{
            if(err){
                console.log("ERROR!");
            }
            else{
                res.render('articles',{ articles: articles })
            }
        })
})

app.get('/articles/:id',(req,res)=>{
    console.log(req.url)
    article.findById(req.params.id ,(err,articles)=>{
        if(err) res.redirect('/articles')
        else{
            // console.log(articles);
            res.render('show',{ articles: articles })
        }
       
    });
    
})

app.get('/edit/:id',(req,res)=>{
    console.log(req.url)
    article.findById(req.params.id ,(err,articles)=>{
        if(err) res.redirect('/articles')
        else{
            console.log(articles);
            res.render('edit',{ articles: articles })
        }
       
    });
    
})

app.put('/articles/:id',(req,res)=>{
    console.log(req.url)
    const items = new article({
        title:req.body.title,
        description:req.body.description,
    });
    items.save();
    // articles.save()
    article.findByIdAndDelete(req.params.id ,(err,articles)=>{
        if(err){
            console.log("Error, Article cannot be deleted")
        }
        else{
            console.log("Updated the item")
            res.redirect('/articles')
        }
       
    });


})


app.delete('/articles/:id',(req,res)=>{
    console.log(req.url)
    article.findByIdAndDelete(req.params.id ,(err,articles)=>{
        if(err){
            console.log("Error, Article cannot be deleted")
        }
        else{
            console.log("Deleted the item")
            res.redirect('/articles')
        }
       
    });
    
})

app.get('/newArticle',(req,res) => {
    res.render('createArticle')
})

app.post('/newArticle',(req,res)=>{
    console.log("new article")
    const articles = new article({
        title:req.body.title,
        description:req.body.description,
    });
    articles.save()
    res.redirect('/articles')
})



//ROUTE FOR MAP PAGE
app.get('/map',(req,res)=>{
    res.render('map', { username: req.session.username });
});

app.get('/profile', isAuth, (req, res) => {
    const username = req.session.username;
    res.render('profile', { username: username });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('login');
})


//ERROR ROUTE CUSTOM
app.use((req, res) => {
    res.render('error', { username: req.session.username });
});


//SETTING UP THE PORT
app.listen(3000, () => {
	console.log("Server started listening on port 3000");
});
