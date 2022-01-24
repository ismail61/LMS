const mongoose = require('mongoose')
const { db } = require('../config')

mongoose.connect(db.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => {
    console.log('Connected to database ');
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err)
});