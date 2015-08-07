blackjackGame.factory('playerFactory', function() {

  var Player = function() {
    this.currentCards = [[]];
    this.balance = 100;
    this.currentBet = 0;
    this.handIndex = 0;
  };

  Player.prototype.getCard = function(game) {
    var card = game.dealOne();
    this.currentCards[this.handIndex].push(card);
    return card;
  };

  Player.prototype.clearRound = function() {
    this.currentCards = [[]];
    this.currentBet = 0;
    this.handIndex = 0;
    return this.currentCards;
  }

  Player.prototype.bet = function(amount) {
    this.balance -= amount;
    this.currentBet += amount;
  };

  Player.prototype.canDouble = function(game) {
    var cards = this.currentCards[this.handIndex]
    if (game.pointsTotal(cards) < 14) { return true; }
    if (cards[0].substring(1) === 'A' || cards[0].substring(1) === 'A') { return true; }
    return false;
  };

  Player.prototype.doubleDown = function(game) {
    this.bet(this.currentBet);
    var card = this.getCard(game, 0);
    return card;
  };

  Player.prototype.canSplit = function() {
    if (this.currentCards.length === 1 && this.currentCards[0].length === 2) {
      var cards = this.currentCards[0]
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

  Player.prototype.stand = function(game) {
    // moves to that players next hand, and hits automatically
    if (this.handIndex != this.currentCards.length - 1) {
      this.handIndex += 1;
      this.getCard(game);
    } else { return 'done' }
  };

  return Player;

});
