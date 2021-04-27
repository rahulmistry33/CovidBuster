var fs = require("fs");
const multer  = require('multer');

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

// //FILE UPLOADING USING MULTER
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }

// }

// const upload = multer({ storage: storage, fileFilter: fileFilter });

// app.post('/profile', upload.single('avatar') ,(req, res) => {
//     console.log(req.body);
//     res.render('profile');
// });
