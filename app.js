const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const connectFlash = require('connect-flash');
const expressSession = require('express-session');
const expressValidator = require('express-validator');
const expressMessage = require('express-messages');
const passport = require('passport');

//Require Mongoose Connection
const DBConnection = require('./api/config/connect');

const app = express();

app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Express Session Middleware
app.use(expressSession({
    secret: 'your secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//Express Connect-flash Middleware
app.use(connectFlash());

//Express Messages Middleware
app.use((req, res, next) => {
    res.locals.messages = expressMessage(req, res);
    next();
});

//Express Validator Middleware
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

require('./api/config/passport')(passport);

//Initialize Passport
app.use(passport.initialize());
//Passport Session
app.use(passport.session());


app.get('*', (req, res, next) => {
    res.locals.user = req.user || null;
    next();
});


//Index route
const indexRoute = require('./api/routes/index');
//Article route
const articleRoute = require('./api/routes/article');
//About route
const aboutRoute = require('./api/routes/about');
//Signup route
const signupRoute = require('./api/routes/signup');
//Login route
const loginRoute = require('./api/routes/login');

app.use('/home', indexRoute);
app.use('/article', articleRoute);
app.use('/about', aboutRoute);
app.use('/user', signupRoute);
app.use('/user', loginRoute);


module.exports = app;