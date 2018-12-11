require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const hbs = require('hbs');
const logger = require('morgan');
const path = require('path');

const session = require ('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const cors = require('cors');

require('./configs/mongodb');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

//Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'i9Dev - The best Big Monster';

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

const dev = require('./routes/dev-routes');
app.use('/api', dev);

const ent = require('./routes/ent-routes');
app.use('/api', ent);

const project = require('./routes/project-routes');
app.use('/api', project);

const auth = require('./routes/auth-routes');
app.use('/api', auth);

//Passport Setup
require('./configs/passport/strategy');

app.use(express.static("public"));
app.use(session({ 
  secret: "cats",
  resave: true,
  saveUninitialized: true
 }));

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ email: username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }
    
    return next(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
