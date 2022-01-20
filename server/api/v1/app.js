const express = require('express'),
    app = express(),
    morgan = require('morgan'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    compression = require('compression'),
    helmet = require('helmet'),
    xss = require('xss-clean')

require("dotenv").config()
require('./middlewares/hack.middleware')(app)
require('../../config/database/database')
require('../../config/cloudinary/cloudinary')
app.use(xss())
app.use(compression())
app.use(helmet())
app.use(cors({ credentials: true, optionsSuccessStatus: 200, origin: 'http://localhost:3000' }))
app.use(morgan('dev'))
app.use('/public', express.static('public'));
app.use(cookieParser())
app.use(bodyParser.json({ limit: '20mb' }))
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }))
app.use(express.json({ limit: '10kb' }))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST,PATCH');
    res.header("Access-Control-Allow-Headers", "Content-Type , Authorization");
    next();
});
require('./routes')(app)

module.exports = app
