const express = require('express');
const app = express();
const path = require('path');

//cookie parser:
var cookieParser = require('cookie-parser')
app.use(cookieParser());

 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.set('view engine', 'ejs');

// static files for every route
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));

//file uploading 
const multer  = require('multer');


app.listen(3000, () => {
    console.log('Server is listening');
});

app.get('/clear_cookies', (req, res) => {
    res.clearCookie('name');
    console.log('Coockies cleared!');
    res.render('index');
});

app.get('/get_cookies', (req, res) => {
    console.log(req.cookies);
});

app.get('/', (req, res) => {
    console.log('Hello there!');
    res.render('index');
});

app.get('/Login', (req, res) => {
    console.log("Redirected to login page");
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

app.post('/profile', upload.single('avatar') ,(req, res) => {
    console.log(req.body);
    res.render('profile');
});

app.use((req, res) => {
    res.render('error');
});

var fs = require("fs");

fs.readFile("temp.txt", {encoding:'utf8'},function(err, buf) {
  console.log(buf);
});

let data = "This is a file containing a collection of books."; 

fs.writeFile("temp.txt", data, (err) => { 
    if (err) {
      console.log(err);
    } else { 
      console.log("File written successfully\n"); 
      console.log("The written has the following contents:"); 
      console.log(fs.readFileSync("temp.txt", "utf8")); 
    } 
});