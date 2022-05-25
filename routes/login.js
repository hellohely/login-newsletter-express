var express = require("express");
var router = express.Router();

let users = [];

//Hämta listan med användare från mongodb
router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("newsletterlist")
    .find()
    .toArray()
    .then((results) => {
        users = results;
        //console.log(results)
        //res.send(users)
        
    });
});

//Login
router.post("/", function (req, res) {
  //Leta matchande i listan med användare
  //console.log(users);
  let foundUser = users.find((user) => {
      return user.email == req.body.email && user.password == req.body.password
  })

  if(foundUser) {
      //console.log("Inloggning lyckades!");
      res.send("Login successful")
  }

  res.send("Login failed")
});

module.exports = router;
