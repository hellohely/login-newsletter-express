var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var router = express.Router();
var cors = require('cors')
const nanoId = require("nanoid");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var loginRouter = require('./routes/login');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(cors({ credentials: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/login', loginRouter)

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

//Posta nya användare till mongodb databas
app.post("/add", function (req, res) {
    req.app.locals.db
      .collection("newsletterlist")
      .insertOne({id: nanoId.nanoid(), ...req.body})
      .then((result) => {
        res.send("New user added");
      });
  });



module.exports = app;
