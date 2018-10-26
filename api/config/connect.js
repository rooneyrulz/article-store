const mongoose = require('mongoose');

//Connecting to mongodb
mongoose.connect('mongodb://localhost:27017/store', {
    useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
let connection = mongoose.connection;

//Check for errors
connection.on('error', (err) => {
    console.log(err.message);
});

//Check for connection
connection.once('open', () => {
    console.log(`connection successfull!`);
});