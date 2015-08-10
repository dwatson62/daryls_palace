roulette.controller('RouletteController', ['PlayerFactory', 'WheelFactory', '$interval', function(PlayerFactory, WheelFactory, $interval) {

  var self = this;
  var player = new PlayerFactory();
  var wheel = new WheelFactory();

  self.amountBet = 0;
  self.bet = [];
  self.inactiveChips = [false, false, false, false]
  self.pastSpins = [];
  self.playerBalance = player.balance;
  self.previousBet = [];
  self.totalBet = 0;
  self.winnings = 0;

  self.timer = 10;
  self.message = 'Place your bets... ' + self.timer;

  $interval(timeChange, 1000)

  function timeChange() {
    self.timer --;
    if (self.timer > 0) { self.message = 'Place your bets... ' + self.timer; }
    if (self.timer == 0) {
      self.message = 'No more bets please'
      self.chipButtons(true);
    }

    if (self.timer == -3) { $('#display-msg').fadeTo( "slow", 0); }

    if (self.timer == -5) {
      self.spin();
      self.message = wheel.number + " " + wheel.colour;
      $('#display-msg').fadeTo( "slow", 1);
    }
    if (self.timer == -10) {
      self.timer = 10
      self.message = 'Place your bets... ' + self.timer
      self.chipButtons(false);
    }
  };

  self.hideTimer = function() {
    if (self.timer < 1) { return true; }
    return false;
  }

  self.blackOrRedBtn = function(number, line) {
    var redNumbers = [[3, 9, 12, 18, 21, 27, 30, 36], [5, 14, 23, 32], [1, 7, 16, 19, 25, 34]];
    for (i = 0; i < redNumbers[line].length; i ++) {
      if (redNumbers[line][i] === number) { return 'rednumber-btn'; }
    }
    return 'blacknumber-btn';
  };

  self.chipButtons = function(booleanValue) {
    for (x in self.inactiveChips) { self.inactiveChips[x] = booleanValue; }
  }

  self.disableButton = function() {
    if (self.timer < 0) { return true; }
    if (self.amountBet === 0 || self.playerBalance < self.amountBet) { return true; }
    return false;
  };

  self.placeBet = function(amount, index) {
    self.amountBet = amount;
    self.chipButtons(true);
    self.inactiveChips[index] = false;
  };

  self.numberBet = function(number) {
    self.bet.push( { 'bet': parseInt(number), 'amount': self.amountBet } );
    self.confirmBet();
  };

  self.colourBet = function(colour) {
    self.bet.push( { 'bet': colour, 'amount': self.amountBet } );
    self.confirmBet();
  };

  self.oddOrEvenBet = function(option) {
    self.bet.push( { 'bet': option, 'amount': self.amountBet } );
    self.confirmBet();
  };

  self.columnBet = function(column) {
    self.bet.push( { 'bet': column, 'amount': self.amountBet } );
    self.confirmBet();
  };

  self.dozenBet = function(dozen) {
    self.bet.push( { 'bet': dozen, 'amount': self.amountBet } );
    self.confirmBet();
  };

  self.highLowBet = function(highLow) {
    self.bet.push( { 'bet': highLow, 'amount': self.amountBet } );
    self.confirmBet();
  };

  self.confirmBet = function() {
    player.placeBet(self.amountBet);
    self.playerBalance = player.balance;
    self.totalBet += self.amountBet;
  };

  self.repeatBet = function() {
    self.bet = self.previousBet;
    for (i = 0; i < self.bet.length; i ++) {
      player.balance -= self.bet[i].amount;
      self.totalBet += self.bet[i].amount;
    }
    self.playerBalance = player.balance;
  };

  self.clearBets = function() {
    player.balance += self.amountBet;
    self.endRound();
  };

  self.spin = function() {
    wheel.spin();
    self.displayNumber();
    self.spinHistory();
    self.previousBet = self.bet;
    self.checkPlayerBets();
    self.endRound();
  };

  self.displayNumber = function() {
    self.number = wheel.number + " " + wheel.colour;
    $('#' + wheel.number).fadeOut(2000);
    $('#' + wheel.number).fadeIn(2000);
  };

  self.spinHistory = function() {
    self.pastSpins.push( { 'number': wheel.number, 'colour': wheel.colour } );
  };

  self.checkPlayerBets = function() {
    for (i = 0; i < self.bet.length; i ++) {
      var amount = self.bet[i].amount;
      var bet = self.bet[i].bet;
      player.colourBetCheck(amount, bet, wheel);
      player.numberBetCheck(amount, bet, wheel);
      player.oddOrEvenBetCheck(amount, bet, wheel);
      if (typeof(bet) === 'string') { self.checkOutsideBets(amount, bet); }
    }
  };

  self.checkOutsideBets = function(amount, bet) {
    if (bet.substring(0, 6) === 'Column') {
      player.columnBetCheck(amount, bet, wheel);
    } else if (bet.substring(0, 5) === 'Dozen') {
      player.dozenBetCheck(amount, bet, wheel);
    } else {
      player.highLowBetCheck(amount, bet, wheel);
    }
  };

  self.endRound = function() {
    self.playerBalance = player.balance;
    self.winnings = player.winnings;
    player.resetWinnings();
    self.amountBet = 0;
    self.bet = [];
    self.totalBet = 0;
  };

}]);