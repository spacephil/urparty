const mongoose  = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');
const Schema    = mongoose.Schema;

//Defining UserSchema
const partySchema = new Schema({
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  title: String,
  partyPassword: String,
  date: {type: Date},
  start: String,
  street: String,
  city: String,
  occassion: String,
  theme: String,
  entrenceCost: Number,
  provideFood: String,
  providedFood: [String],
  broughtFood: [String],
  provideDrinks: String,
  providedDrinks: [String],
  broughtDrinks: [String],
  plusGuest: Number,
  dressCode: String,
  wishlist: String,
  wishlistList: [String],
  moreInfo: String,
  spotifyPlaylist: String,
  vTopics: [String],
  vAnswers: [String],
  guestsList: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  partyPicture: String
})

//Generating a hash
partySchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Checking if password is valid
partySchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

//Exporting the UserSchema
const Party = mongoose.model("party", partySchema);

module.exports = Party;
