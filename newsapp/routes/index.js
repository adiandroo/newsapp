var express = require('express');
var router = express.Router();

// Welcome page
router.get('/', function(req, res, next) {
  res.render('welcome', { title: 'Welcome' });
});

//Dashboard
router.get("/dashboard", function(req, res, next){
  res.render("dashboard", {title:"Dashboard"})
})
module.exports = router;
