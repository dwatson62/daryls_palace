blackjackGame.factory('playerFactory', function() {

  var Player = function() {
    this.currentCards = [];
  };

  Player.prototype.getCard = function(game) {
    this.currentCards.push(game.dealOne());
  };

  return Player;

});
