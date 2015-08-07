blackjackGame.controller('BlackjackController', ['gameFactory', 'playerFactory', '$timeout', function(gameFactory, playerFactory, $timeout) {

  var self = this;
  var player = new playerFactory();
  var dealer = new playerFactory();
  var game = new gameFactory();

  self.game = game;

  self.playerBalance = '£' + player.balance;

  self.toggleShuffleDeck = function() {
    game.canShuffle = false;
  };

  self.showDoubleDownButton = function() {
    if (self.playerScore < 14 && self.playerTurn === true) { return true; }
    return false;
  };

  self.showSplitButton = function() {
    if (player.canSplit() === true && self.playerTurn === true) { return true; }
    return false;
  };

  self.hasSplit = function() {
    if (self.splitOnce === true && self.playerTurn === true) { return true; }
    return false;
  };

  self.startRound = function(amount) {
    self.clearPreviousRound();
    self.playerTurn = true;
    self.bet(amount);
    self.dealerHit();
    self.hit(0);
    self.hit(0);
  };

  self.clearPreviousRound = function() {
    self.dealerTurn = false;
    self.blackjackResult = null;
    player.clearRound();
    dealer.clearRound();
    self.result = null;
    self.splitOnce = false;
  }

  self.bet = function(amount) {
    player.bet(amount);
    self.playerBalance = '£' + player.balance;
  };

  self.dealerHit = function() {
    dealer.getCard(game, 0);
    self.dealerCards = dealer.currentCards;
    self.calculateScore(dealer, 0);
  };

  self.dealersTurn = function() {
    self.dealerTurn = true;
    while (self.dealerScore < 17) { self.dealerHit(); }
    self.determineWinner();
  };

  self.hit = function(index) {
    player.getCard(game, index);
    self.playerCards = player.currentCards;
    self.calculateScore(player, 0);
    if (self.playerScore == 'Bust' || self.playerScore === 21) { self.stand(index); }
  };

  self.stand = function(index) {
    // next player turn
    player.stand(game, index)
    if (index === self.playerCards.length - 1) {
      self.playerTurn = false;
      self.dealersTurn();
    } else { self.splitOnce = true; }
  };

  self.doubleDown = function() {
    player.doubleDown(game);
    self.playerCards = player.currentCards;
    self.calculateScore(player, 0);
    self.playerBalance = '£' + player.balance;
    self.stand(0);
  };

  self.split = function() {
    self.playerCards = player.split();
    self.playerBalance = '£' + player.balance;
    // console.log(self.playerCards)
    self.hit(0);
  };

  self.calculateScore = function(user, index) {
    var cards = user.currentCards[index];
    var total = game.pointsTotal(cards)
    if (user === player) {
      self.playerScore = total;
    } else if (user === dealer) { self.dealerScore = total; }
    if (total === 21 && user.currentCards[index].length === 2) {
      self.blackjacks();
    }
  };

  self.blackjacks = function() {
    self.blackjackResult = 'Blackjack!';
    var winnings = game.blackjack(player);
    self.playerBalance = '£' + player.balance;
    self.result = 'Player wins £' + winnings;
  };

  self.determineWinner = function() {
    for (x in player.currentCards) {
      // console.log(player.currentCards[x])
      var total = game.pointsTotal(player.currentCards[x]);
      if ( self.dealerScore === total) { self.isADraw(); }
      else if (total > self.dealerScore ||
        (self.dealerScore === 'Bust' && total != 'Bust')) {
          self.playerWins();
        }
      else { self.result = 'You lose'; }
    }
  };

  self.isADraw = function() {
    self.result = 'Draw';
    game.draw(player);
    self.playerBalance = '£' + player.balance;
  };

  self.playerWins = function() {
    var winnings = game.winnings(player);
    self.playerBalance = '£' + player.balance;
    self.result = 'Player wins £' + winnings;
  };

}]);