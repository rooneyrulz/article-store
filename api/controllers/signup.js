const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user_schema');

//Render signup 
exports.RenderSignup = (req, res, next) => {
    res.status(200).render('signup', { title: 'Signup User' });
};

//Signup user
exports.SignupUser = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                let errorMsg = 'Duplicate email id found!';
                res.status().render('server_error', { message: 'Error!', error: errorMsg });
                console.log(errorMsg);
            } else {
                User.find({ username: req.body.username })
                    .exec()
                    .then(user => {
                        if (user.length >= 1) {
                            let errorMsg = 'Duplicate username found!';
                            res.status().render('server_error', { message: 'Error!', error: errorMsg });
                            console.log(errorMsg);
                        } else {
                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                if (err) {
                                    res.status(500).render('server_error', { message: 'Error', error: err });
                                    console.log(err.message);
                                } else {
                                    let user = new User({
                                        _id: new mongoose.Types.ObjectId(),
                                        name: req.body.name,
                                        email: req.body.email,
                                        username: req.body.username,
                                        password: hash
                                    });
                                    return user
                                        .save()
                                        .then(user => {
                                            res.status(201).send(user);
                                            console.log(user);
                                        })
                                        .catch(err => {
                                            res.status(500).render('server_error', { message: 'Server Error', error: err });
                                            console.log(err.message);
                                        });
                                }
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500).render('server_error', { message: 'Server Error', error: err });
                        console.log(err.message);
                    });
            }
        })
        .catch(err => {
            res.status(500).render('server_error', { message: 'Server Error', error: err });
            console.log(err.message);
        });
};