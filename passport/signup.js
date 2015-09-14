var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

  passport.use('signup', new LocalStrategy({
    passReqToCallback : true
    },

    function(req, username, password, done) {
      if (req.param('email').length === 0) {
        return done(null, false, req.flash('message','Please fill in all fields'));
      } else if (req.body.password !== req.body.passwordConfirmation) {
        console.log('Passwords do not match');
        return done(null, false, req.flash('message', 'Passwords do not match'));
      }

      findOrCreateUser = function(){
        User.findOne({ 'username' :  username }, function(err, user) {
          if (err){
            console.log('Error in SignUp: ' + err);
            return done(null, false, req.flash('message','There was an error, please try again.'));
          }
          if (user) {
            console.log('User already exists with username: ' + username);
            return done(null, false, req.flash('message','User Already Exists'));
          } else {
            var newUser = new User();
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = req.param('email');
            newUser.save(function(err) {
              if (err){
                console.log('Error in Saving user: ' + err);
                throw err;
              }
              console.log('User Registration succesful');
              return done(null, newUser, req.flash('message', "Welcome to Daryl's Palace " + newUser.username));
            });
          }
        });
      };
      process.nextTick(findOrCreateUser);
    })
  );

  // Generates hash using bCrypt
  var createHash = function(password){
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

}