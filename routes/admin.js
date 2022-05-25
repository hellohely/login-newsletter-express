var express = require("express");
const app = require("../app");
var router = express.Router();

router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("newsletterlist")
    .find()
    .toArray()
    .then((results) => {
      let printUsers = "<div><h2>Registrerade användare</h2>";

      for (user in results) {
        printUsers += "<div>" + results[user].email + "</div>";
      }
      printUsers += "</div>";
      res.send(printUsers);
    });
});

module.exports = router;
