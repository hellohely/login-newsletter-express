var express = require("express");
var router = express.Router();

let users = [];
let admin = [];

//User login
router.post("/", function (req, res) {
  //Hämta listan med användare från mongodb
  req.app.locals.db
    .collection("newsletterlist")
    .find()
    .toArray()
    .then((results) => {
      //Leta matchande i listan med användare
      users = results;
      let foundUser = users.find((user) => {
        return (
          user.email == req.body.email && user.password == req.body.password
        );
      });

      if (foundUser) {
        let userId = foundUser._id.toString();
        res.cookie("userId", userId);

        //req.session.loggedInUser = foundUser.id;
        return res.send("Login successful");
      }

      res.status("401");
      res.send("Invalid logon credentials");
    });
});

//Admin login
router.post("/admin", function (req, res) {
  req.app.locals.db
    .collection("adminlogin")
    .find()
    .toArray()
    .then((results) => {
      admin = results;
      let foundAdmin = admin.find((adminlogin) => {
        console.log(req.body);
        return (
          adminlogin.username == req.body.username &&
          adminlogin.password == req.body.password
        );
      });

      if (foundAdmin) {
        //req.session.loggedInAdmin = foundAdmin.username;
        let adminId = foundAdmin._id.toString();
        res.cookie("adminId", adminId )
        return res.send("Admin login successful");
      }

      res.status("401");
      res.send("Invalid admin logon credentials");
    });
});

module.exports = router;
