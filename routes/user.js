var express = require('express');
var router = express.Router();

router.get('/getloggedinuser', function(req, res, next) {

  if(req.session.loggedInUser) {
    return res.send(req.session.loggedInUser)
  }

  res.send('Authentication failed');
});

module.exports = router;