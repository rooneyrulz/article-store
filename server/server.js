const http = require('http');
//const open = require('opn');

const port = process.env.PORT || 6000;

const App = require('../app');

const server = http.createServer(App);
server.listen(port, () => {
    console.log(`server started on the port ${port}`);
    /*open('http://localhost:4000/home', { app: 'chrome' }, (err) => {
        if (err) throw err;
    });*/
});