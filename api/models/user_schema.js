const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },

    name: {
        type: String,
        require: [true, 'name is not valid!']
    },

    email: {
        type: String,
        require: [true, 'email is not valid!']
    },

    username: {
        type: String,
        require: [true, 'username is not valid!']
    },

    password: {
        type: String,
        require: [true, 'password is not valid!']
    }
});

module.exports = mongoose.model('User', userSchema);