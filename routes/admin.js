var express = require("express");
const app = require("../app");
var router = express.Router();

router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("newsletterlist")
    .find()
    .toArray()
    .then((results) => {
      let printUsers = "<div><h2>Våra users</h2>";

      for (user in results) {
        printUsers += "<div>" + results[user].email + "</div>";
      }
      printUsers += "</div>";
      res.send(printUsers);
    });
});

router.post("/add", function (req, res) {
  req.app.locals.db
    .collection("newsletterlist")
    .insertOne(req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/");
    });
});

module.exports = router;
