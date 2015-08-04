beforeEach(function(){
  browser.get('http://localhost:3000');
});

var bet10 = element(by.id('bet10-btn'));
var hitbtn = element(by.id('hit-btn'));
var standbtn = element(by.id('stand-btn'));
var playerScore = element(by.id('player-score'));
var dealerScore = element(by.id('dealer-score'));
var result = element(by.id('result'));
var balance = element(by.id('player-balance'));

describe('Blackjack', function() {

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Blackjack');
  });

  it('can start a new game', function() {
    bet10.click();
    expect(hitbtn.isPresent()).toBeTruthy();
    expect(standbtn.isPresent()).toBeTruthy();
  });

  it('dealer gets one face up card at the start of the game', function() {
    bet10.click();
    var dealerCards = element.all(by.css('.dealer-cards')).count();
    expect(dealerCards).toEqual(1);
  });

  it('dealer gets one face down card at the start of the game', function() {
    bet10.click();
    var dealerCard = element.all(by.css('img#dealer-second-card')).count();
    expect(dealerCard).toEqual(1);
  });

  it('player gets two cards at the start of the game', function() {
    bet10.click();
    var playerCards = element.all(by.css('.player-cards')).count();
    expect(playerCards).toEqual(2);
  });

  it('displays player and dealer score', function() {
    bet10.click();
    expect(playerScore.isPresent()).toBeTruthy;
    expect(dealerScore.isPresent()).toBeTruthy;
  });

  it('displays player balance', function() {
    expect(balance.getText()).toEqual('£100');
  });

  it('displays result after the game', function() {
    bet10.click();
    standbtn.click();
    expect(result.isPresent()).toBeTruthy;
  });

  it('has the option to play a new game', function() {
    bet10.click();
    standbtn.click();
    expect(bet10.isPresent()).toBeTruthy;
  });

});