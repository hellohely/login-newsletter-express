var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//var router = express.Router();
var cors = require("cors");
const nanoId = require("nanoid");

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var adminRouter = require("./routes/admin");
var authorizationRouter = require("./routes/authorization");
//const cookieSession = require("cookie-session");
const { strict } = require("assert");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
// app.use(
//   cookieSession({
//     secret: "MySecretKey",
//     maxAge: 1000 * 60 * 30,
//     //sameSite: true,
//     httpOnly: false,
//     secure: false,
//   })
// );
// app.use(function (req, res, next) {
//   req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
//   next();
// });

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/authorization", authorizationRouter);
app.use("/user", userRouter);

//Importera mongodb
const MongoClient = require("mongodb").MongoClient;

//Connecta till mongodb server
MongoClient.connect("mongodb://localhost:27017", {
  useUnifiedTopology: true,
}).then((client) => {
  console.log("Vi är uppkopplade mot mongodb-databasen");

  const db = client.db("newsletterlist");
  app.locals.db = db;
});

//Posta nya användare till mongodb databas
app.post("/add", function (req, res) {
  req.app.locals.db
    .collection("newsletterlist")
    .insertOne(req.body)
    .then((result) => {
      res.send("New user added");
    });
});

module.exports = app;
