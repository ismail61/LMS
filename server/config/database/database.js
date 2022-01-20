const mongoose = require('mongoose')
//process.env.DB_URL
//const url = 'mongodb://localhost:27017/library-management-system';
//const url = 'mongodb+srv://root:<password61@>@database.dcg2q.mongodb.net/<test>?retryWrites=true&w=majority';
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
    console.log('Database error: ' + err)
});