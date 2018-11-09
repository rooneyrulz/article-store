const LocalStrategy = require('passport-local').Strategy;
const Connection = require('../config/connect');
const bcrypt = require('bcrypt');
const User = require('../models/user_schema');

module.exports = (passport) => {
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'User not found!' });
            }

            //Check for password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password!' });
                }
            })
        });
    }));

    //Passport Serialization
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //Passport Deserialization
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
};
