describe('Blackjack Controller', function() {

  beforeEach(module('blackjack'));

  var ctrl;

  beforeEach(inject(function($controller, gameFactory) {
    ctrl = $controller('BlackjackController');
  }));

  describe('Basic moves', function() {

    beforeEach(function() {
      spyOn(ctrl.game, 'dealOne').and.returnValue('D6');
      ctrl.startRound(10);
    });

    it('is defined', function() {
      expect(ctrl).toBeDefined();
    });

    it('player gets two cards at the start of each game', function() {
      expect(ctrl.playerCards[0].length).toEqual(2);
    });

    it('player can hit', function() {
      ctrl.hit(0);
      expect(ctrl.result).toBeDefined();
    });

    it('player can stand, to find out the result', function() {
      ctrl.stand(0);
      expect(ctrl.result).toBeDefined();
    });

    it('can start a new round', function() {
      ctrl.stand(0);
      ctrl.startRound(10);
      expect(ctrl.playerCards[0].length).toEqual(2);
    });

  });

  describe('Winning and losing', function() {

    beforeEach(function() {
      ctrl.toggleShuffleDeck();
    });

    it('player can lose their bet with a lower score than the dealer', function() {
      spyOn(ctrl.game, 'dealOne').and.returnValue('D5');
      ctrl.startRound(10);
      ctrl.hit(0);
      ctrl.stand(0);
      expect(ctrl.playerBalance).toEqual('£90')
      expect(ctrl.result).toEqual('You lose')
    });

    it('player can draw and get their stake back', function() {
      spyOn(ctrl.game, 'dealOne').and.returnValue('D6');
      ctrl.startRound(10);
      ctrl.hit(0);
      ctrl.stand(0);

      expect(ctrl.playerBalance).toEqual('£100');
      expect(ctrl.result).toEqual('Draw');
    });
  });

  describe('Splitting', function() {

    beforeEach(function() {
      // D6
      spyOn(ctrl.game, 'dealOne').and.returnValue('D6');
      ctrl.toggleShuffleDeck();
      ctrl.startRound(10);
    });

    it('player doubles bet on a split', function() {
      ctrl.split();
      expect(ctrl.playerBalance).toEqual('£80');
    });

    it('player automatically gets an extra card on first split card', function() {
      ctrl.split();
      expect(ctrl.playerCards[0].length).toEqual(2);
    });

    it('player can hit on first split card', function() {
      ctrl.split();
      ctrl.hit(0);
      expect(ctrl.playerCards).toEqual([['D6', 'D6', 'D6'],['D6']]);
    });

    it('player can stand on first split card, and automatically hits on second split card', function() {
      ctrl.split();
      ctrl.stand(0);
      expect(ctrl.playerCards).toEqual([['D6', 'D6'],['D6', 'D6']]);
    });

    it('player can draw with dealer on both split bets', function() {
      ctrl.split();
      ctrl.hit(0);
      ctrl.stand(0);
      ctrl.hit(1);
      ctrl.stand(1);
      expect(ctrl.playerBalance).toEqual('£100');
      expect(ctrl.result).toEqual('Draw');
    });

  });

});
