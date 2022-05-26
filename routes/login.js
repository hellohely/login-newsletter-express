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
        users = results;
        //console.log(results)
        //res.send(users)
        //console.log(users);
        let foundUser = users.find((user) => {
            return user.email == req.body.email && user.password == req.body.password
        })
      
        if(foundUser) {
            //console.log("Inloggning lyckades!");
            return res.send(foundUser.id);
            
        }
        
        res.status("401");
        res.send("Invalid logon credentials")
        
      });
    });
  //Leta matchande i listan med användare
 


module.exports = router;
