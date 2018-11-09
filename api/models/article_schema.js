const mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },

    title: {
        type: String,
        require: [true, 'title is not valid!'],
        lowercase: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    message: {
        type: String,
        require: [true, 'message is not valid!'],
        lowercase: true
    }
});

module.exports = mongoose.model('Article', articleSchema);