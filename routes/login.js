var express = require('express');
var router = express.Router();

//Hämta listan med användare från mongodb

//Login
router.post("/", function (req, res){
  //Leta matchande i listan med användare
  console.log(req.body);
  res.send("Login successful")
}); 

module.exports = router;
