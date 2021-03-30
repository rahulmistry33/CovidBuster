const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('../models/db');
const userModel = require('../models/User');

//body-parser 
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//file uploading 
const multer  = require('multer');
const path = require('path');
const User = require('../models/User');

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

router.get('/', (req, res) => {
    res.render('login');

});


router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/',upload.single('avatar'), async (req, res) => {
    const username = req.body.Username;
    const phone = req.body.Contact_no;
    const email = req.body.Email;
    const password = req.body.Password;
    const age = req.body.Age;

    let user = await userModel.findOne({email});

    if (user) {
        return res.redirect('/login');
    }

    const hashPW = await bcrypt.hash(password, 12);
    user = new userModel({
        username,
        phone,
        email,
        password: hashPW,
        age
    });

    await user.save();

    res.redirect('/login');
    console.log(req.body);
    console.log(`${username} user registered`);
});

router.post('/profile', async (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;
    
    let user = await userModel.findOne({email}).catch( e => { console.error(e) });

    if (!user) {
        console.log("User does not exist");
        return res.redirect('/login/register');
    }
    const isMatch = await bcrypt.compare(password, user.password).catch( e => { console.error(e) });
    if (!isMatch) {
        console.log("Wrong Credentials");
        return res.redirect('/login');
    }
    console.log(`${email} logged in!`);
    req.session.isAuth = true;
    req.session.username = user.username;
    console.log(req.session);
    res.redirect('/profile');
});

module.exports = router;
 