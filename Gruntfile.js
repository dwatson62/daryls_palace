module.exports = function(grunt){

  var userSchema = require('./models/user'),
  mongoose = require('mongoose'),
  db = mongoose.connection,
  User = mongoose.model('User', userSchema);
  var bCrypt = require('bcrypt-nodejs');

  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'src/*/*.js', 'spec/*/*.js']
    }
  });

  grunt.registerTask('addUser', 'add a user', function(username, password) {
    var done = this.async();
    mongoose.connect('mongodb://localhost/darylsPalace');

    var createHash = function(password){
      return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

    db.on('open', function () {

      var user = new User({
        username: username,
        password: createHash(password),
        email: 'test@test.com'
      });

      user.save(function (error) {
        console.log(user);
        if (error) {
          console.log(error);
          return handleError(error);
        }
        console.log('Success!');
        db.close();
        done(true);
      });

    });
  });

  grunt.registerTask('deleteUser', 'delete a user', function(username) {
    var done = this.async();
    mongoose.connect('mongodb://localhost/darylsPalace');

    db.on('open', function () {
      User.findOne({ username: username }, function(error, user) {
        if (error) {
          console.log(error);
          return handleError(error);
        }
        if (user) {
          User.remove({ username: username }, function() {
            console.log(username + ' was deleted!');
            db.close();
            done(true);
          });
        } else {
          console.log(username + ' not found!');
          db.close();
          done(true);
        }
      });


    });
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);

};
