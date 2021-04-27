const mongoose = require('mongoose');
const uri = 'mongodb+srv://rahulmistry:1234@cluster0.k9erx.mongodb.net/covid-buster?retryWrites=true&w=majority'

// mongoose.connect('mongodb://localhost:27017/covidBuster', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// })
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then((res) => {
    console.log("MongoDB coneected!");
});


module.exports = mongoose;