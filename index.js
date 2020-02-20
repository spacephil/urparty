const express = require("express");
const bodyParser = require('body-parser');
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const partyRoutes = require("./routes/party-routes");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
const flash    = require('connect-flash');
const fs = require("fs");
const http = require('http');
const https = require("https");



const app = express();

const httpsOptions = {
  cert: fs.readFileSync("./ssl/urpartyssl.cer"),
  key: fs.readFileSync("./ssl/urparty-private.key")
}

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000 * 7,
  keys: [keys.session.cookieKey]
}));

//initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser());
app.use(flash());

//Connecting to the Database
mongoose.connect(keys.mongodb.dbURL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Database!")
});

// app.set('port', (process.env.PORT || 5000));
 app.use(express.static(__dirname));
// app.set('views', __dirname + '/views');
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", (req, res) => {
  res.render("home");
});

//set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/party", partyRoutes);

// http.createServer(app).listen(80);
// https.createServer(httpsOptions, app)
//   .listen(443, () => {
//     console.log("Urparty is starting on Port 443. Fancy lights gooooooooooo!!!");
//   });
app.listen(3000, () =>{
  console.log("urparty is starting on port 3000!. Fancy lights goooooooo!!!");
});
