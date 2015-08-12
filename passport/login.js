var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

  passport.use('login', new LocalStrategy({
    passReqToCallback : true
    },
    function(req, username, password, done) {
      console.log(req);
      console.log(username);
      console.log(password);
      User.findOne({ 'username' : username },
        function(err, user) {
          if (err) {
            console.log('There was an error apparently');
            return done(err);
          }
          if (!user) {
            console.log('User Not Found with username ' + username);
            return done(null, false,
              req.flash('message', 'User Not Found.'));
          }
          if (!isValidPassword(user, password)) {
            console.log('Invalid Password');
            return done(null, false,
              req.flash('message', 'Invalid Password'));
          }
          console.log('Login succesful');
          return done(null, user, req.flash('message', "Welcome back " + username));
        }
      );

  }));


  var isValidPassword = function(user, password) {
    return bCrypt.compareSync(password, user.password);
  }

}