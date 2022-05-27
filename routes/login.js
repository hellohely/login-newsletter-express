var express = require("express");
var router = express.Router();

let users = [];

//Login
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
        res.cookie("kaka", "testkaka");

        req.session.loggedInUser = foundUser.id;
        return res.send("Login successful");
      }

      res.status("401");
      res.send("Invalid logon credentials");
    });
});

module.exports = router;
