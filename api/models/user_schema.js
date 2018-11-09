const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },

    name: {
        type: String,
        require: [true, 'name is not valid!'],
        lowercase: true
    },

    email: {
        type: String,
        require: [true, 'email is not valid!'],
        lowercase: true
    },

    username: {
        type: String,
        require: [true, 'username is not valid!'],
        lowercase: true
    },

    password: {
        type: String,
        require: [true, 'password is not valid!'],
    }
});

module.exports = mongoose.model('User', userSchema);