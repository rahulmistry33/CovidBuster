const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:false})

app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Server is listening');
});

app.get('/', (req, res) => {
    console.log('Hello there!');
    //res.send('<h1> Welcome to website</h1>');
    //res.sendFile('./views/index.html', { root: __dirname });
    res.render('index');
});

app.get('/Login', (req, res) => {
    console.log("Redirected to login page");
    res.render('login');
});

app.use((req, res) => {
    //res.sendFile('./views/error.html', { root: __dirname });
    res.render('error');
});