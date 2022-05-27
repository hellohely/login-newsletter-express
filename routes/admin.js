var express = require("express");
const app = require("../app");
var router = express.Router();

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

          subscribed += "<div>" + results[user].email + ", </div>";
        }
      }
      printUsers += "</div>";
      subscribed += "</div>";

    let adminPage = printUsers + subscribed;
      res.send(adminPage);
    });
});

module.exports = router;
