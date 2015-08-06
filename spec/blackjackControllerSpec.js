describe('Blackjack Controller', function() {

  beforeEach(module('blackjack'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('BlackjackController');
  }));

  describe('Basic moves', function() {

    beforeEach(function() {
      // return D6
      spyOn(Math, 'random').and.returnValue(0.09);
      ctrl.startRound(10);
    });

    it('is defined', function() {
      expect(ctrl).toBeDefined();
    });

    it('player gets two cards at the start of each game', function() {
      expect(ctrl.playerCards.length).toEqual(2);
    });

    it('player can hit', function() {
      ctrl.hit();
      expect(ctrl.result).toBeDefined();
    });

    it('player can stand, to find out the result', function() {
      ctrl.stand();
      expect(ctrl.result).toBeDefined();
    });

    it('can start a new round', function() {
      expect(ctrl.playerCards.length).toEqual(2);
    });

  });

  describe('Winning and losing', function() {

    it('player can lose their bet with a lower score than the dealer', function() {
      // D5
      spyOn(Math, 'random').and.returnValue(0.07);
      ctrl.startRound(10);
      ctrl.hit();
      ctrl.stand();
      expect(ctrl.playerBalance).toEqual('£90')
      expect(ctrl.result).toEqual('You lose')
    });

    it('player can draw and get their stake back', function() {
      // D6
      spyOn(Math, 'random').and.returnValue(0.09);
      ctrl.startRound(10);
      ctrl.hit();
      ctrl.stand();

      expect(ctrl.playerBalance).toEqual('£100');
      expect(ctrl.result).toEqual('Draw')
    });

    it('player can split and bet extra money', function() {
      spyOn(Math, 'random').and.returnValue(0.09);
      ctrl.startRound(10);
      ctrl.split();
      expect(ctrl.playerBalance).toEqual('£80');
    });


  });


});