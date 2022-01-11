const mongoose = require('mongoose')

//const url = 'mongodb://localhost:27017/library-management-system';
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
//const connection = mongoose.connection;
mongoose.connection.on('connected', () => {
    console.log('Connected to database ');
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});
