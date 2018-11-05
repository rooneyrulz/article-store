const mongoose = require('mongoose');

//Connecting to mongodb
mongoose.connect( process.env.MONGO_CONNECTION_STRING , {
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

module.exports = connection;