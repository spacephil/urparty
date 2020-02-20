const router = require("express").Router();
const User = require("../models/user-model");
const Party = require("../models/party-model");
const bodyParser = require('body-parser');

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
  res.render("home", {user:req.user});
});

router.get("/join", authCheck, (req,res) => {
  res.render("join", {user: req.user});
})

router.get("/create", authCheck, (req, res) => {
  res.render("create", {user: req.user});
})

router.post("/createParty", urlencodedParser, authCheck, (req, res) => {
  var newParty = {
    owner: req.user.id,
    title: req.body.partyTitle,
    partyPassword: req.body.partyPassword,
    date: req.body.date,
    start: req.body.start,
    street: req.body.street,
    city: req.body.city,
    occassion: req.body.occassion,
    theme: req.body.theme,
    entrenceCost: req.body.entrence,
    partyPicture: req.body.partyPictureLink,
    provideFood: req.body.foodOrigin,
    providedFood: req.body.Item1,
    broughtFood: req.body.Item2,
    provideDrinks: req.body.drinkOrigin,
    providedDrinks: req.body.Item3,
    broughtDrinks: req.body.Item4,
    plusGuest: req.body.guestPlus,
    dressCode: req.body.dresscode,
    wishlist: req.body.wishlist,
    wishlistList: req.body.Item5,
    moreInfo: req.body.advancedInfo,
    spotifyPlaylist: req.body.spotPlaylist,
    vTopics: req.body.voteTopic,
    vAnswers: req.body.vote
  }
  Party.create(newParty, (err, newlyCreated) => {
    if(err){
      req.redirect(back);
    } else {
      User.findById(newlyCreated.owner, function(err, foundUser){
        foundUser.createdParties.push(newlyCreated.id);
        foundUser.save(function (err){
          if(err){
            console.log(err);
          }
        })
      })
      res.redirect("/party/" + newlyCreated._id);
    }
  })
});

router.get("/main", urlencodedParser, authCheck, (req, res) => {
  User.findById(req.user.id)
    .populate({path: "invitedParties createdParties", model: Party})
    .exec(function(err, userMain){
      if(err){
        console.log(err);
      } else {
        res.render("main", {user: userMain});
      }
    })
})

router.get("/:partyid", urlencodedParser, authCheck, (req, res) => {
  Party.findById(req.params.partyid)
    .populate("guestsList", "profileImg", User)
    .exec(function(err, partey){
    if(err){
      console.log(err);
    } else {
      var partyInfo = partey;
      res.render("party", {user: req.user, party: partyInfo});
    }
  })
})

router.post("/join", urlencodedParser, authCheck, (req, res) => {
  Party.findById(req.body.partyId, function(err, pInvite){
    if(err){
      console.log(err);
      res.redirect("/party/join");
    } else {
      //Check for no doubles
      if(req.body.partyPw == pInvite.partyPassword){
        if(req.user.id != pInvite.owner){
          for(var i = 0; i<pInvite.guestsList.length; i++){
            if(req.user.id == pInvite.guestsList[i]){
              return res.redirect("/party/" + pInvite.id);
            } else {
              console.log("nothing found boss");
            }
          };
          //Set User onto the guestlist
          pInvite.guestsList.push(req.user.id);
          pInvite.save(function(err){
            if(err){
              console.log(err);
            } else {
              console.log("Successfully excepted the invite");
              User.findById(req.user.id, function(err, foundUser){
                if(err){
                  console.log(err)
                } else {
                  foundUser.invitedParties.push(pInvite.id);
                  foundUser.save(function(err){
                    if(err){
                      console.log(err);
                    }
                  })
                }
              });
              res.redirect("/party/" + pInvite.id);
            }
          });
        } else {
          res.redirect("/party/join");
        }
      }
    }
  })
})

router.get("/invitationcard/:id", urlencodedParser, authCheck, (req, res) => {
  Party.findById(req.params.id, function(err, foundParty){
    if(err){
      console.log(err);
    } else {
      res.render("invite", {user: req.user, party: foundParty});
    }
  })
})

router.get("/invitation/:id", urlencodedParser, authCheck, (req, res) => {
  var infos = req.params.id;
  res.render("joinbylink", {user: req.user, info: req.params.id});
})
//Delete
// router.delete("/:partyid", authCheck, function(req, res, next){
//   Party.findById(req.params.partyid, (err, partyP) => {
//     if(err){
//       console.log(err);
//     } else{
//       User.findById(req.user.id, (err, user) => {
//         for(var i = 0; i<user.createdParties.length; i++){
//           if(req.params.partyid == user.createdParties[i]){
//             user.createdParties.splice(i, 1);
//           }
//         }
//       })
//       for(var i = 0; i<partyP.guestsList.length; i++){
//         User.findById(partyP.guestsList[i], (err, foundUser) => {
//           for(var i = 0; i<foundUser.invitedParties.length; i++){
//             if(partyP.id == foundUser.invitedParties[i]){
//               foundUser.invitedParties.splice(i, 1);
//             }
//           }
//         })
//       }
//       Party.remove(partyP, (err) =>{
//         if(err){
//           console.log(err)
//         } else {
//           res.send("Success");
//         }
//       })
//     }
//   })
// });




module.exports = router;
