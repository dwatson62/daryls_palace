describe('RouletteController', function() {
  beforeEach(module('Roulette'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('RouletteController');
  }));

  it('Player can clear current bets', function() {
    ctrl.amountBet = 10;
    ctrl.colourBet('Red');
    ctrl.clearBets();
    expect(ctrl.bet).toEqual([]);
  });

  describe('(1) Player can bet and win', function() {

    beforeEach(function() {
      // return 1
      spyOn(Math, 'random').and.returnValue(0.03);
      ctrl.amountBet = 10;
    });

    it('on Red', function() {
      ctrl.colourBet('Red');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(120);
    });

    it('on 1', function() {
      ctrl.numberBet('1');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(450);
    });

    it('on odd', function() {
      ctrl.oddOrEvenBet('Odd');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(120);
    });

    it('on a column', function() {
      ctrl.columnBet('Column 1');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(120);
    });

    it('on a dozen', function() {
      ctrl.dozenBet('Dozen 1');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(120);
    });

    it('on 1-18', function() {
      ctrl.highLowBet('1 - 18');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(120);
    });

  });

  describe('(22) Player can bet and win', function() {

    beforeEach(function() {
      // return 22
      spyOn(Math, 'random').and.returnValue(0.6);
      ctrl.amountBet = 10;
    });

    it('on even', function() {
      ctrl.oddOrEvenBet('Even');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(120);
    });

    it('on black', function() {
      ctrl.colourBet('Black');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(120);
    });

    it('on 19-36', function() {
      ctrl.highLowBet('19 - 36');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(120);
    });

  });

  describe('(1) Player can bet and lose', function() {

    beforeEach(function() {
      // return 1
      spyOn(Math, 'random').and.returnValue(0.03);
      ctrl.amountBet = 10;
    });

    it('on 2', function() {
      ctrl.numberBet('2');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(90);
    });

    it('on even', function() {
      ctrl.oddOrEvenBet('Even');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(90);
    });

    it('on black', function() {
      ctrl.colourBet('Black');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(90);
    });

    it('on a column', function() {
      ctrl.columnBet('Column 2');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(90);
    });

    it('on a dozen', function() {
      ctrl.dozenBet('Dozen 2');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(90);
    });

    it('on 19-36', function() {
      ctrl.highLowBet('19 - 36');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(90);
    });

  });

  describe('Can bet multiple times', function() {

    beforeEach(function() {
      // return 1
      spyOn(Math, 'random').and.returnValue(0.03);
    });

    it('with the same amount', function() {
      ctrl.amountBet = 10;
      ctrl.oddOrEvenBet('Odd');
      ctrl.columnBet('Column 1');
      ctrl.dozenBet('Dozen 1');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(160);
    });

    it('with different amounts', function() {
      ctrl.amountBet = 10;
      ctrl.oddOrEvenBet('Odd');
      ctrl.amountBet = 20;
      ctrl.columnBet('Column 1');
      ctrl.amountBet = 5;
      ctrl.dozenBet('Dozen 1');
      ctrl.spin();
      expect(ctrl.playerBalance).toEqual(170);
    });

  });

  describe('Shows player winnnings after each game', function() {

    it('when a player has won', function() {
      // returns 1
      spyOn(Math, 'random').and.returnValue(0.03);
      ctrl.amountBet = 10;
      ctrl.oddOrEvenBet('Odd');
      ctrl.spin();
      expect(ctrl.winnings).toEqual(20);
    });

    it('when a player did not win', function() {
      ctrl.spin();
      expect(ctrl.winnings).toEqual(0);
    });
  });

});