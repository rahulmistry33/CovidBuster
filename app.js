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




//CONNECT TO MONGODB
// mongoose.connect("mongodb://localhost:27017/covidBuster", { useUnifiedTopology: true },{ useNewUrlParser: true },{useCreateIndex: true}, {useFindAndModify: false})




//CONNECTION USING MONGODB CLOUD...UNCOMMENT IF NEEDED.
// const dbURI = 'mongodb+srv://rahulmistry:rahul123@covid-buster.z3xlk.mongodb.net/covid-buster?retryWrites=true&w=majority';
// mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
//         .then((result) => app.listen(3000, () => {
//             console.log('Server is listening');
//         }))
//         .catch((err) => console.log(err));
 


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


//ROUTE FOR BLOG PAGE
app.get('/articles',(req,res) => {
        
        article.find({},(err,articles)=>{
            if(err){
                console.log("ERROR!");
            }
            else{
                res.render('articles',{articles:articles})
            }
        })
})

app.get('/articles/:id',(req,res)=>{
    console.log(req.url)
    article.findById(req.params.id ,(err,articles)=>{
        if(err) res.redirect('/articles')
        else{
            // console.log(articles);
            res.render('show',{articles:articles})
        }
       
    });
    
})

app.get('/edit/:id',(req,res)=>{
    console.log(req.url)
    article.findById(req.params.id ,(err,articles)=>{
        if(err) res.redirect('/articles')
        else{
            console.log(articles);
            res.render('edit',{articles:articles})
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



//ROUTE FOR LOGIN PAGE
app.get('/Login', (req, res) => {
    console.log("Redirected to login page");
    res.render('login');
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


//SETTING UP THE PORT
app.listen(3000, () => {
	console.log("Server started listening on port 3000");
});


