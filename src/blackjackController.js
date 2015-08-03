blackjackGame.controller('BlackjackController', ['gameFactory', 'playerFactory', function(gameFactory, playerFactory) {

  var self = this;
  var player = new playerFactory();
  var dealer = new playerFactory();
  var game = new gameFactory();

  self.playerCards = [];
  self.playerScore;

  self.dealerCards = [];
  self.dealerScore;

  self.isGameStarted = false
  self.result;

  self.startRound = function() {
    self.isGameStarted = true;
    self.dealerHit();
  };

  self.hit = function() {
    var card = player.getCard(game);
    self.playerCards.push( { 'card': card, 'src': '/images/cards/' + card + '.png' } );
    self.calculatePlayerScore();
  };

  self.stand = function() {
    while (self.dealerScore < 17) { self.dealerHit(); }
    self.determineWinner();
  }

  self.calculatePlayerScore = function() {
    self.playerScore = game.pointsTotal(player.currentCards);
    if (self.playerScore == 'Bust') { self.stand(); }
  };

  self.nextRound = function() {
    self.playerCards = [];
    player.nextRound();
    self.playerScore = null;
    self.dealerCards = [];
    dealer.nextRound();
    self.dealerScore = null;
    self.result = null;
  };

  self.dealerHit = function() {
    var card = dealer.getCard(game);
    self.dealerCards.push( { 'card': card, 'src': '/images/cards/' + card + '.png' } );
    self.calculateDealerScore();
  };

  self.calculateDealerScore = function() {
    self.dealerScore = game.pointsTotal(dealer.currentCards);
  };

  self.determineWinner = function() {
    if ( self.dealerScore === self.playerScore) { self.result = 'Draw'; }
    else if ( self.playerScore === 'Bust') { self.result = 'Dealer wins'; }
    else if ( self.dealerScore === 'Bust') { self.result = 'Player wins'; }
    else if ( self.dealerScore > self.playerScore) { self.result = 'Dealer wins'; }
    else if ( self.dealerScore < self.playerScore) { self.result = 'Player wins'; }
  };

}]);