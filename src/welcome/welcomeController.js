welcome.controller('welcomeController', ['$http', function($http) {

  var self = this;

  self.newUser = function() {
    $http({
      url: "/users",
      method: 'POST',
      data: {
        username: self.username,
        email: self.email,
        password: self.password
      }
    });

  };

}]);