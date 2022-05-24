var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Importera mongodb
const MongoClient = require("mongodb").MongoClient;

//Connecta till mongodb server
MongoClient.connect("mongodb://localhost:27017", {
    useUnifiedTopology: true
})
.then(client => {
    console.log("Vi är uppkopplade mot mongodb-databasen");

    const db = client.db("newsletterlist");
    app.locals.db = db;
})

module.exports = app;
