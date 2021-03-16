const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sessions', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then((res) => {
    console.log("MongoDB coneected!");
});


module.exports = mongoose;