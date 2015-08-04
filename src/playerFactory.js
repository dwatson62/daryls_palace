blackjackGame.factory('playerFactory', function() {

  var Player = function() {
    this.currentCards = [];
    this.balance = 100;
    this.currentBet = 0;
  };

  Player.prototype.getCard = function(game) {
    var card = game.dealOne();
    this.currentCards.push(card);
    return card;
  };

  Player.prototype.nextRound = function() {
    this.currentCards = [];
    this.currentBet = 0;
    return this.currentCards;
  }

  Player.prototype.bet = function(amount) {
    this.balance -= amount;
    this.currentBet += amount;
  };

  return Player;

});
