const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
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

const uri = 'mongodb+srv://rahulmistry:1234@covid-buster.k9erx.mongodb.net/covidBuster?retryWrites=true&w=majority'
const store = new MongoDBStore({
    // uri: 'mongodb://localhost:27017/covidBuster',
    uri:uri,
    collection: 'mySessions'
});

app.use(session({
    secret: 'prac',
    resave: false,
    saveUninitialized: false,
    store: store 
}));

app.use('*',(req,res) => {
    res.sendFile(path.join(__dirname,'public/index.html'))
})


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
app.use(cors())
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
                //FOR EJS:
                // res.render('articles',{ articles: articles })

                //FOR ANGULAR SERVING AS A REST API
                res.json(articles)
            }
        })
})

// READ A PARTICULAR BLOG USING THE ID
app.get('/articles/:id',(req,res)=>{
    console.log(req.url)
    article.findById(req.params.id ,(err,articles)=>{
        if(err) console.log("ERROR ARTICLE NOT FOUND")
        else{
            //FOR EJS
            // res.render('show',{ articles: articles })

            //FOR ANGULAR SERVING AS A REST API
            res.json(articles);
        }
       
    });
    
})

//EDIT ROUTE TO EDIT A PARTICULAR BLOG POST
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

//UPDATING A BLOG POST
app.put('/articles/:id',(req,res)=>{
    console.log(req.url)
    const items  = {
        title:req.body.title,
        description:req.body.description,
    };
    article.findOneAndUpdate({_id:req.params.id },items,(err,articles)=>{
        if(err){
            console.log("Error, Article cannot be deleted")
        }
        else{
            console.log("Updated the item:")
            //FOR EJS
            // res.redirect('/articles')

            //FOR ANGULAR
            res.send({articles:articles});
        }
       
    });
})

//DELETE A BLOG POST
app.delete('/articles/:id',(req,res)=>{
    console.log(req.url)
    article.findByIdAndDelete(req.params.id ,(err,articles)=>{
        if(err){
            console.log("Error, Article cannot be deleted")
        }
        else{
            console.log("Deleted the item")
            //FOR EJS
            // res.redirect('/articles')

            //FOR ANGULAR
            res.send({message:"Delete the item"})
        }
       
    });
    
})

//WRITE A NEW ARTICLE
app.get('/newArticle',(req,res) => {
    res.render('createArticle')
})

//SAVE THE ARTICLE TO DATABASE
app.post('/newArticle',(req,res)=>{
    // console.log(req.title+" title is");
    const articles = new article({
        title:req.body.title,
        description:req.body.description,
    });
    console.log("Bruh")
    articles.save()

    //FOR ANGULAR
    res.send({articles:articles});

    //FOR EJS
    // res.redirect('/articles')
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
