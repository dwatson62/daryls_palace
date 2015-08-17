roulette.factory('WheelFactory', function() {

  var Wheel = function() {};

  Wheel.prototype.spin = function() {
  	this.number = Math.floor(Math.random() * 37);
  	this.setColour();
  	this.isOddOrEven();
    this.setColumnNumber();
  	this.setDozenNumber();
  };

  Wheel.prototype.setColour = function() {
  	var reds = [1, 3, 5, 7, 9, 12, 13, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    this.colour = 'Black';
  	if (this.number === 0) { this.colour = 'Green';	}
    for (i = 0; i < reds.length; i ++) {
      if (reds[i] === this.number) { this.colour = 'Red'; }
    }
  };

  Wheel.prototype.isOddOrEven = function() {
  	if (this.number === 0) { this.oddOrEven = 'Zero'; }
    else if (this.number % 2 === 0 ) { this.oddOrEven = 'Even'; }
    else { this.oddOrEven = 'Odd'; }
  };

  Wheel.prototype.setColumnNumber = function() {
    var columns = [ [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
                    [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
                    [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36] ];
    for (i = 0; i < columns.length; i ++) {
      for (j = 0; j < columns[i].length; j ++) {
        if (this.number == columns[i][j]) { this.columnNumber = i + 1; }
      }
    }
  };

  Wheel.prototype.setDozenNumber = function() {
    if (this.number <= 12 ) { this.dozenNumber = 1; }
    else if (this.number <= 24) { this.dozenNumber = 2; }
    else { this.dozenNumber = 3; }
  };

  return Wheel;

});
