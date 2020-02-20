const mongoose  = require("mongoose");
var bcrypt   = require('bcrypt-nodejs');
const Schema    = mongoose.Schema;

//Defining UserSchema
const userSchema = new Schema({
  username: String,
  googleId:  String,
  facebookId: String,
  facebookToken: String,
  email: String,
  profileImg: String,
  password: String,
  firstName: String,
  lastName: String,
  invitedParties: [{type: mongoose.Schema.Types.ObjectId, ref: "Party"}],
  createdParties: [{type: mongoose.Schema.Types.ObjectId, ref: "Party"}],
  achievements: [String]
})

//Generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Checking if password is valid
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

//Exporting the UserSchema
const User = mongoose.model("user", userSchema);

module.exports = User;
