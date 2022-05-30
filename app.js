var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//var router = express.Router();
var cors = require("cors");
//const nanoId = require("nanoid");

var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");
var authorizationRouter = require("./routes/authorization");
//const cookieSession = require("cookie-session");
const { strict } = require("assert");
const { send } = require("process");
const { ObjectId } = require("mongodb");

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

app.post("/userdata", function (req, res) {
  //Hämta listan med användare från mongodb
  req.app.locals.db
    .collection("newsletterlist")
    .find()
    .toArray()
    .then((results) => {
      //Leta matchande i listan med användare
      users = results;
      let foundUser = users.find((user) => {
        return user._id == req.body.userId;
      });

      if (foundUser) {
        console.log("Användare hittad", foundUser);

        //req.session.loggedInUser = foundUser.id;

        let userData = {
          name: foundUser.firstName,
          newsletter: foundUser.newsletter,
        };
        return res.send(userData);
      }

      return res.send("user id not found");
    });
});

app.post("/newslettersettings", function (req, res) {
  req.app.locals.db
    .collection("newsletterlist")
    .updateOne(
      { _id: new ObjectId(req.body.userId) },
      { $set: { newsletter: req.body.newsletter } }
    );

  res.send("newsletter settings updated");
});

module.exports = app;
