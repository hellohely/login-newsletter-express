var express = require("express");
const app = require("../app");
var router = express.Router();

let logInForm =
  '<form action="http://localhost:3000/authorization/admin" method="post"><input type="text" placeholder="Användarnamn" name="username" /><input type="password" placeholder="Lösenord" name="password" /><input type="submit" value="Logga in"></input> </form>';

  let adminId = "";

  let adminPage = "Laddar rätt, fel funktion";

router.get("/", function (req, res) {

  req.app.locals.db
  .collection("newsletterlist")
  .find()
  .toArray()
  .then((results) => {
    let printUsers = "<div><h2>Registrerade användare:</h2>";
    let subscribed = "<div><h2>Prenumeranter på nyhetsbrev:</h2>";

    for (user in results) {
      printUsers +=
        "<div>" +
        results[user].firstName +
        " " +
        results[user].lastName +
        ", " +
        results[user].email +
        "</div>";

      if (results[user].newsletter) {
        subscribed += results[user].email + ", ";
      }
    }
    printUsers += "</div>";
    subscribed += "</div>";
    let logOut = '<form action="admin/logout" method="get"><input type="submit" value="Logga ut"></form>'

    adminPage = printUsers + subscribed + logOut;
    //return res.send(adminPage);
  });

  adminId = req.cookies.adminId

  req.app.locals.db
  .collection("adminlogin")
  .find()
  .toArray()
  .then((results) => {
    admin = results;
    let loggedInAdmin = admin.find((adminlogin) => {
      return (
        adminlogin._id == adminId
      );
    });

    if (loggedInAdmin) {
      return res.send(adminPage)
    }
    res.send(logInForm)
  });
});

router.get('/logout', function(req, res){
  res.clearCookie("adminId")
  res.send('Du är nu utloggad');
});






module.exports = router;
