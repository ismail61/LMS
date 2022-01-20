process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const app = require('./api/v1/app')
socket = require('socket.io'),
    Emitter = require('events'),
    PORT = process.env.PORT || 5555


const server = app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})

//Event Emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

//Socket IO
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000"
    }
})

require('./socket/socketIO')(eventEmitter,io)

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});