blackjackGame.controller('BlackjackController', ['gameFactory', 'playerFactory', '$timeout', function(gameFactory, playerFactory, $timeout) {

  var self = this;
  var player = new playerFactory();
  var dealer = new playerFactory();
  var game = new gameFactory();

  self.blackjackResult;
  self.playerCards = [];
  self.playerScore;

  self.dealerCards = [];
  self.dealerScore;

  self.isGameStarted = false
  self.result;

  self.startRound = function() {
    self.blackjackResult = null;
    self.playerCards = [];
    self.playerScore = null;
    player.nextRound();
    self.dealerCards = [];
    self.dealerScore = null;
    dealer.nextRound();
    self.result = null;
    self.isGameStarted = true;
    self.dealerHit();
    self.hit();
    self.hit();
  };

  self.hit = function() {
    var card = player.getCard(game);
    self.playerCards.push( { 'card': card, 'src': '/images/cards/' + card + '.png' } );
    self.calculatePlayerScore();
    if (self.playerScore == 21 && self.playerCards.length == 2) {
      self.blackjacks();
    }
    if (self.playerScore == 21) { self.stand(); }
  };

  self.stand = function() {
    // next player turn
    self.isGameStarted = false;
    self.dealersTurn();
  };

  self.calculatePlayerScore = function() {
    self.playerScore = game.pointsTotal(player.currentCards);
    if (self.playerScore == 'Bust') { self.stand(); }
  };

  self.blackjacks = function() {
    self.blackjackResult = 'Blackjack!';
  };

  self.dealersTurn = function() {
    while (self.dealerScore < 17) {
      // $timeout(function() {
        self.dealerHit();
      // }, 300);
    }
    self.determineWinner();
  };

  self.dealerHit = function() {
    var card = dealer.getCard(game);
    self.dealerCards.push( { 'card': card, 'src': '/images/cards/' + card + '.png' } );
    self.calculateDealerScore();
    if (self.dealerScore == 21 && self.dealerCards.length == 2) {
      self.blackjacks();
    }
  };

  self.calculateDealerScore = function() {
    self.dealerScore = game.pointsTotal(dealer.currentCards);
  };

  self.determineWinner = function() {
    if ( self.dealerScore === 'Bust' && self.playerScore === 'Bust') { self.result = 'You all lose'; }
    else if ( self.dealerScore === self.playerScore) { self.result = 'Draw'; }
    else if ( self.playerScore === 'Bust') { self.result = 'Dealer wins'; }
    else if ( self.dealerScore === 'Bust') { self.result = 'Player wins'; }
    else if ( self.dealerScore > self.playerScore) { self.result = 'Dealer wins'; }
    else if ( self.dealerScore < self.playerScore) { self.result = 'Player wins'; }
  };

}]);