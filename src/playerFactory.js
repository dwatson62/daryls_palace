blackjackGame.factory('playerFactory', function() {

  var Player = function() {
    this.currentCards = [[]];
    this.balance = 100;
    this.currentBet = 0;
  };

  Player.prototype.getCard = function(game, index) {
    var card = game.dealOne();
    this.currentCards[index].push(card);
    return card;
  };

  Player.prototype.clearRound = function() {
    this.currentCards = [[]];
    this.currentBet = 0;
    return this.currentCards;
  }

  Player.prototype.bet = function(amount) {
    this.balance -= amount;
    this.currentBet += amount;
  };

  Player.prototype.doubleDown = function(game) {
    this.bet(this.currentBet);
    var card = this.getCard(game, 0);
    return card;
  };

  Player.prototype.canSplit = function(game) {
    var cards = this.currentCards[0]
    if (cards.length === 2) {
      if (cards[0].substring(1) === cards[1].substring(1)) { return true; }
    }
    return false;
  };

  Player.prototype.split = function() {
    var card1 = this.currentCards[0][0];
    var card2 = this.currentCards[0][1];
    this.currentCards = [[card1], [card2]];
    this.bet(this.currentBet);
    return this.currentCards;
  };

  Player.prototype.stand = function(game, index) {
    if (index != this.currentCards.length - 1) {
      this.getCard(game, index + 1);
    }
  };

  return Player;

});
