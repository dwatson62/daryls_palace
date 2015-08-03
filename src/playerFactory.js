blackjackGame.factory('playerFactory', function() {

  var Player = function() {
    this.currentCards = [];
  };

  Player.prototype.getCard = function(game) {
    var card = game.dealOne();
    this.currentCards.push(card);
    return card;
  };

  Player.prototype.nextRound = function() {
    this.currentCards = [];
    return this.currentCards;
  }

  return Player;

});
