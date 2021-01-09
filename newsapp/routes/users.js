var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var User = require("../models/UserSchema");

// login
router.get('/login', function(req, res, next) {
  res.render('login', {title:"Halaman Login"});
});

// register
router.get('/register', function(req, res, next){
  res.render('register', {title:"Halaman register"})
});

// action login
router.post("/login", function(req, res){
  const {email, password} = req.body;

  let errors = [];

  if (!email || !password) {
    errors.push({msg:"Silahkan lengkapi data anda"});
  }
  if (errors.length > 0) {
    res.render("login",{
      errors,
      email,
      password,
    });
  } else {
    User.findOne({email:email}).then(user=>{
      if (user){
        if (bcrypt.compareSync(password,user.password)){
          res.redirect("/dashboard");
        } else {
          errors.push({msg:"Password anda tidak sama"});
          res.render("login", {
            errors
          });
        }
      } else {
        errors.push({msg:"Email anda belum terdaftar"});
        res.render("login", {
          errors
        });
      }
    });
  }
});

// action register
router.post("/register", function(req, res){
  const {name, email, password, password2} = req.body;
  
  let errors = [];

if (!name || !email || !password || !password2) {
  console.log("Silahkan lengkapi data anda");
  errors.push({msg:"Silahkan lengkapi data anda"});
}

if (password != password2) {
  console.log("password tidak sama");
  errors.push({msg:"password tidak sama"});
}

if (errors.length > 0) {
  res.render("register",{
    errors,
    name,
    email,
    password,
    password2
  });
} else {
  User.findOne({email:email}).then(
    user =>{
      if (user) {
        console.log("Email sudah ada");
        errors.push({msg:"Email sudah ada"});
        res.render("register",{
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
      const newUser = new User({
        name,
        email,
        password
      });
      newUser.save().then(user=>{
        console.log("Selamat anda telah registrasi, silahkan login");
        res.redirect("/users/login");
      }).catch(err=>console.log(err))
    }
  }
  );
}
});

// logout
router.get("/logout", function(req, res){
  res.redirect("/");
});

module.exports = router;
