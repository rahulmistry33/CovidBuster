const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:false})
const path = require('path');

//cookie parser:
var cookieParser = require('cookie-parser')
app.use(cookieParser());

 

app.set('view engine', 'ejs');
app.use(bodyParser.json());

// static files for every route
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));

//file uploading 
const multer  = require('multer');


app.listen(3000, () => {
    console.log('Server is listening');
});

app.get('/cookie',(req,res)=>{
    res.cookie('name', 'rahul').send('cookie set');
    // console.log("cookies:"+req.cookies);
});
app.get('/', (req, res) => {
    console.log('Hello there!');
    //res.send('<h1> Welcome to website</h1>');
    //res.sendFile('./views/index.html', { root: __dirname })
    res.render('index');
});

app.get('/Login', (req, res) => {
    console.log("Redirected to login page");
    console.log("cookies:"+req.cookies);
    res.render('login');
});

app.get('/map',(req,res)=>{

    res.render('map');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}

const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
app.post('/upload', upload.single('avatar'), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});


//custom middleware to check age of user:

app.use('/ageForm',urlencodedParser,(req, res, next) => {
    // console.log(res.body.age);
    console.log(req.body);
    var age = parseInt(req.body.ageVal);
    console.log(req.body.ageVal);
    if(age > 18){

        res.render("login",{age:'Age is '+age+" It is valid age"});
    }
    else{
        res.render("login",{age:'Age is '+age+" It is invalid age"});
    }
    next();
});

app.post('/ageForm',urlencodedParser,(req,res,next) => {
    // console.log(req.body['age']+" recevied");
    console.log(req.body.ageVal);
    res.json(req.body);
});

app.use((req, res) => {
    //res.sendFile('./views/error.html', { root: __dirname });
    res.render('error');
});

var fs = require("fs");

fs.readFile("temp.txt", {encoding:'utf8'},function(err, buf) {
  console.log(buf);
});

let data = "This is a file containing a collection of books."; 
  
fs.writeFile("temp.txt", data, (err) => { 
  if (err) 
    console.log(err); 
  else { 
    console.log("File written successfully\n"); 
    console.log("The written has the following contents:"); 
    console.log(fs.readFileSync("temp.txt", "utf8")); 
  } 
}); 