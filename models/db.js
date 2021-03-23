const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/covidBuster', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then((res) => {
    console.log("MongoDB coneected!");
});


module.exports = mongoose;