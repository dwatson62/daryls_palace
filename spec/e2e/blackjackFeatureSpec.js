beforeEach(function(){
  browser.get('http://localhost:3000');
});

var playbtn = element(by.id('play-btn'));
var hitbtn = element(by.id('hit-btn'));
var standbtn = element(by.id('stand-btn'));
var playerScore = element(by.id('player-score'));
var dealerScore = element(by.id('dealer-score'));
var result = element(by.id('result'));

describe('Blackjack', function() {

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Blackjack');
  });

  it('can start a new game', function() {
    playbtn.click();
    expect(hitbtn.isPresent()).toBeTruthy();
    expect(standbtn.isPresent()).toBeTruthy();
  });

  it('dealer gets one face up card at the start of the game', function() {
    playbtn.click();
    var dealerCards = element.all(by.css('.dealer-cards')).count();
    expect(dealerCards).toEqual(1);
  });

  it('dealer gets one face down card at the start of the game', function() {
    playbtn.click();
    var dealerCard = element.all(by.css('img#dealer-second-card')).count();
    expect(dealerCard).toEqual(1);
  });

  it('player gets two cards at the start of the game', function() {
    playbtn.click();
    var playerCards = element.all(by.css('.player-cards')).count();
    expect(playerCards).toEqual(2);
  });

  it('displays player and dealer score', function() {
    playbtn.click();
    expect(playerScore.isPresent()).toBeTruthy;
    expect(dealerScore.isPresent()).toBeTruthy;
  });

  it('displays result after the game', function() {
    playbtn.click();
    standbtn.click();
    expect(result.isPresent()).toBeTruthy;
  });

  it('has the option to play a new game', function() {
    playbtn.click();
    standbtn.click();
    expect(playbtn.isPresent()).toBeTruthy;
  });

});