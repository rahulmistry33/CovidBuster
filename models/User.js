const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: false
    }
});

module.exports = mongoose.model('User', userSchema);