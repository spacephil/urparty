const router = require("express").Router();
const passport = require("passport");


//auth login
router.get("/login", (req, res) => {
  res.render("login", {message: req.flash("loginMessage")});
});
//Auth logout
router.get("/logout", (req,res) => {
  //Handle with Passport
  req.logout();
  res.redirect("/");
});

//auth with google
router.get("/google", passport.authenticate("google",{
  scope: ["profile","email"]
}));

//callback route for google auth
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/party/main");
});

//auth with facebook
router.get("/facebook", passport.authenticate("facebook",{
  scope: ["public_profile", "email"]
}));

//callback route for facebook auth
router.get("/facebook/redirect", passport.authenticate("facebook", {
  successRedirect: "/party/main",
  failureRedirect: "/"
}));

//signup route for main signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});

//process the signup form
router.post("/signup", passport.authenticate("local-signup", {
  successRedirect: "/party/main",
  failureRedirect: "/auth/signup"
}));

//process the login form
router.post("/login", passport.authenticate("local-login",{
  successRedirect: "/party/main",
  failureRedirect: "/auth/login",
  failureFlash: true
}));

router.get("/dataguide", (req, res) => {
  res.render("dataguide");
})


module.exports = router;
