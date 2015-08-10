roulette.factory('PlayerFactory', function() {

  var Player = function() {
    this.balance = 100;
    this.winnings = 0;

    this.placeBet = function(amount) {
      this.balance -= amount;
    };

  };

  Player.prototype.resetWinnings = function() {
    this.winnings = 0;
  };

  Player.prototype.collectWinnings = function(amount, factor) {
    this.balance += (amount * (factor + 1));
    this.winnings += (amount * factor);
  };

  Player.prototype.colourBetCheck = function(amount, option, wheel) {
    if (wheel.colour === option) {
      this.collectWinnings(amount, 2)
    }
  };

  Player.prototype.numberBetCheck = function(amount, option, wheel) {
    if (wheel.number === option) {
      this.collectWinnings(amount, 35)
    }
  };

  Player.prototype.oddOrEvenBetCheck = function(amount, option, wheel) {
    if (wheel.oddOrEven === option) {
      this.collectWinnings(amount, 2)
    }
  };

  Player.prototype.columnBetCheck = function(amount, option, wheel) {
    var columnNumber = parseInt(option.split('').pop());
      if (wheel.columnNumber === columnNumber) {
        this.collectWinnings(amount, 2)
      }
  };

  Player.prototype.dozenBetCheck = function(amount, option, wheel) {
    var dozenNumber = parseInt(option.split('').pop());
    if (wheel.dozenNumber === dozenNumber) {
      this.collectWinnings(amount, 2)
     }
  };

  Player.prototype.highLowBetCheck = function(amount, option, wheel) {
    var first = parseInt(option.split('').splice(0, 2).join(''));
    var second = parseInt(option.split('').splice(-2).join(''));
    if (first <= wheel.number && wheel.number <= second) {
      this.collectWinnings(amount, 2)
    }
  };

  return Player;

});
