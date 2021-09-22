const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./models')
const http = require('http')
const cors = require('cors')
app.use(express.json())
app.use(cors());


const indexrouter = require('./routes/index')
app.use('/api', indexrouter);

app.set('port', port)

var server = http.createServer(app)

db.sequelize.sync().then(function () {
    server.listen(port, function () {
        console.log(`Port is running ${server.address().port}`);
    });
    server.on('error', onError);
    server.on('listening', onListening);
});


function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe' + port :
        'Port' + port

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges')
            process.exit(1)
            break;
        case 'EADDRINUSE':
            console.error(bind + 'requires elevated privileges')
            process.exit(1)
            break;
        default:
            throw error;
    }
}



function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe' + addr :
        'port' + addr.port;
}


