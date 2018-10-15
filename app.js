const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//Mongoose connection
const Connection = require('./api/config/connect');

const app = express();
const port = process.env.PORT || 6000;

app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Index route
const indexRoute = require('./api/routes/index');
//Article route
const articleRoute = require('./api/routes/article');
//About route
const aboutRoute = require('./api/routes/about');

app.use('/home', indexRoute);
app.use('/article', articleRoute);
app.use('/about', aboutRoute);

app.listen(port, () => console.log(`server started running on the port ${port}`));