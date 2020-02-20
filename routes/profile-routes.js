const router = require("express").Router();
const User = require("../models/user-model");
const bodyParser = require('body-parser');
const url = require('url');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

const authCheck = (req, res, next) => {
  if(!req.user){
    //if user is not logged in
    res.redirect("/auth/login");
  } else {
    //if logged in
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  res.render("profile", {user:req.user});
});

router.post('/', urlencodedParser, authCheck, function(req, res, next){
  User.findById(req.user.id, function (err, user) {
      user.email = req.body.email;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.username = req.body.username;
      user.profileImg = req.body.profileImg;

      user.save(function (err) {
          if(err){
            console.log(err);
          }
          res.redirect('/profile');
      });
  });
});

router.delete("/", authCheck, function(req, res, next){
  User.findById(req.user.id, (err, user) => {
    if(err){
      console.log(err);
    } else{
      User.remove(user, (err) =>{
        if(err){
          console.log(err)
        } else {
          res.send("Success");
        }
      })
    }
  })
});


module.exports = router;
