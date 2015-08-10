describe('PlayerFactory', function() {
  beforeEach(module('Roulette'));

  var player;
  var wheel;

  beforeEach(inject(function(PlayerFactory, WheelFactory) {
    player = new PlayerFactory();
    wheel = new WheelFactory();
  }));

	describe('Player starts with', function() {
		it('£100 balance', function() {
			expect(player.balance).toEqual(100);
		});
	});

	describe('(1) Player can bet', function() {

		beforeEach(function() {
			spyOn(Math, 'random').and.returnValue(0.03);
			player.placeBet(10);
			wheel.spin();
		});

		describe('and win', function() {

			it('on red', function() {
				player.colourBetCheck(10, 'Red', wheel);
				expect(player.balance).toEqual(120);
			});

			it('on a number (1)', function() {
				player.numberBetCheck(10, 1, wheel);
				expect(player.balance).toEqual(450);
			});

			it('on odd', function() {
				player.oddOrEvenBetCheck(10, 'Odd', wheel);
				expect(player.balance).toEqual(120);
			});

			it('on a column', function() {
				player.columnBetCheck(10, 'Column 1', wheel);
				expect(player.balance).toEqual(120);
			});

			it('on a dozen', function() {
				player.dozenBetCheck(10, 'Dozen 1', wheel);
				expect(player.balance).toEqual(120);
			});

			it('on 1-18', function() {
				player.highLowBetCheck(10, '1 - 18', wheel);
				expect(player.balance).toEqual(120);
			});

		});

		describe('and lose', function() {

			it('on black', function() {
				player.colourBetCheck(10, 'Black', wheel);
				expect(player.balance).toEqual(90);
			});

			it('on even', function() {
				player.oddOrEvenBetCheck(10, 'Even', wheel);
				expect(player.balance).toEqual(90);
			});

			it('on 19-36', function() {
				player.highLowBetCheck(10, '19 - 36', wheel);
				expect(player.balance).toEqual(90);
			});
		});

	});

	describe('(22) Player can bet', function() {

		beforeEach(function() {
			spyOn(Math, 'random').and.returnValue(0.6);
			player.placeBet(10);
			wheel.spin();
		});

		describe('and win', function() {

			it('on black', function() {
				player.colourBetCheck(10, 'Black', wheel);
				expect(player.balance).toEqual(120);
			});

			it('on even', function() {
				player.oddOrEvenBetCheck(10, 'Even', wheel);
				expect(player.balance).toEqual(120);
			});

			it('on 19-36', function() {
				player.highLowBetCheck(10, '19 - 36', wheel);
				expect(player.balance).toEqual(120);
			});

		});

		describe('and lose', function() {

			it('on red', function() {
				player.colourBetCheck(10, 'Red', wheel);
				expect(player.balance).toEqual(90);
			});

			it('on a number', function() {
				player.numberBetCheck(10, 1, wheel);
				expect(player.balance).toEqual(90);
			});

			it('on odd', function() {
				player.oddOrEvenBetCheck(10, 'Odd', wheel);
				expect(player.balance).toEqual(90);
			});

			it('on 1-18', function() {
				player.highLowBetCheck(10, '1 - 18', wheel);
				expect(player.balance).toEqual(90);
			});

		});

	});

	describe('Displays winnings after each spin', function() {

		it('when a player has won', function() {
			// returns 1
			spyOn(Math, 'random').and.returnValue(0.03);
			player.placeBet(10);
			wheel.spin();
			player.oddOrEvenBetCheck(10, 'Odd', wheel);
			expect(player.winnings).toEqual(20);
		});

		it('when a player did not win', function() {
			wheel.spin();
			expect(player.winnings).toEqual(0);
		});

		it('can reset winnings', function() {
			player.winnings = 100;
			player.resetWinnings();
			expect(player.winnings).toEqual(0);
		});

	});
});
