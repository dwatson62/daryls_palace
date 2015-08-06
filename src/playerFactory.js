blackjackGame.factory('playerFactory', function() {

  var Player = function() {
    this.currentCards = [];
    this.splitCards = [];
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

  Player.prototype.doubleDown = function(game) {
    this.bet(this.currentBet);
    var card = this.getCard(game);
    return card;
  };

  Player.prototype.canSplit = function(game) {
    if (this.currentCards.length === 2) {
      if (this.currentCards[0].substring(1) === this.currentCards[1].substring(1)) {
        return true;
      }
    }
    return false;
  };

  Player.prototype.split = function() {
    this.splitCards.push([this.currentCards[0]], [this.currentCards[1]]);
    this.bet(this.currentBet);
    return this.splitCards;
  };

  Player.prototype.splitHit = function(game, index) {
    var card = game.dealOne();
    this.splitCards[index].push(card);
  };

  Player.prototype.splitStand = function(game) {

  };

  return Player;

});
