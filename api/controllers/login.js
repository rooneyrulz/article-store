const passport = require('passport');

//Render Login
exports.RenderLogin = (req, res, next) => {
    res.status(200).render('login', { title: 'Login User' });
};

//Login User
exports.LoginUser = (req, res, next) => {
    passport.authenticate('local', { successRedirect: '/home', failureRedirect: '/user/login', failureFlash: true })(req, res, next);
};

//Logout User
exports.LogoutUser = (req, res, next) => {
    req.logout();
    req.flash('success', 'You are logged out!');
    res.redirect('/user/login');
};