beforeEach(function(){
  browser.get('http://localhost:3000');
});

describe('Blackjack', function() {

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Blackjack');
  });

});