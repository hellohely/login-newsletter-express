var express = require("express");
const app = require("../app");
var router = express.Router();

router.post("/", function (req, res, next) {
  let adminLogin = req.body
})

router.get("/", function (req, res, next) {

  req.app.locals.db
    .collection("newsletterlist")
    .find()
    .toArray()
    .then((results) => {
      let printUsers = "<div><h2>Registrerade användare:</h2>";
      let subscribed = "<div><h2>Prenumeranter på nyhetsbrev:</h2>";

      for (user in results) {
        printUsers += "<div>" + results[user].firstName + " " + results[user].lastName + ", " + results[user].email + "</div>";

        if (results[user].newsletter) {

          subscribed += results[user].email + ", ";
        }
      }
      printUsers += "</div>";
      subscribed += "</div>";
      let logOut = "<button>Logga ut</button>"

    let adminPage = printUsers + subscribed + logOut;
      res.send(adminPage);
    });
});

module.exports = router;
