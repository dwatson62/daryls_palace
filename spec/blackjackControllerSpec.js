describe('Blackjack Controller', function() {

  beforeEach(module('blackjack'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('BlackjackController');
    // return D6
    spyOn(Math, 'random').and.returnValue(0.09);
    ctrl.startRound(10);
  }));

  it('is defined', function() {
    expect(ctrl).toBeDefined();
  });

  it('player gets two cards at the start of each game', function() {
    expect(ctrl.playerCards.length).toEqual(2);
  });

  it('player can stand, to find out the result', function() {
    ctrl.stand();
    expect(ctrl.result).toBeDefined();
  });

  it('can start a new round', function() {
    expect(ctrl.playerCards.length).toEqual(2);
  });

  xit('player can win with a higher score than the dealer', function() {
    ctrl.hit();
    spyOn(Math, 'random').and.returnValue(0.08);
    ctrl.stand();
    expect()
  });

});