var express = require("express");
const app = require("../app");
var router = express.Router();

let logInForm =
  '<form action="http://localhost:3000/authorization/admin" method="post"><input type="text" placeholder="Användarnamn" name="username" /><input type="password" placeholder="Lösenord" name="password" /><input type="submit" value="Logga in"></input> </form>';

  // async function login() {
  //   try {
  //     const response = await fetch("http://localhost:3000/authorization/admin", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: '{"username": "admin", "password": "admin"}',
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

router.get("/", function (req, res) {
  console.log(req.cookies);
  console.log(req.session);
  //login();

res.send(logInForm)
  //router.req.cookies();
});

router.get("/adminadmin", function (req, res, next) {
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
      let logOut = "<button>Logga ut</button>";

      //let adminPage = printUsers + subscribed + logOut;
      res.send("Adminpage");
    });
});

module.exports = router;
