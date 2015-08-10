describe('WheelFactory', function() {
  beforeEach(module('Roulette'));

  var wheel;

  beforeEach(inject(function(WheelFactory) {
    wheel = new WheelFactory();
  }));

  it('WheelFactory is defined', function(){
  	expect(wheel).toBeDefined();
  });

	describe('Returns a number', function() {
		it('between 0 and 36', function() {
			wheel.spin();
			expect(0 <= wheel.number && wheel.number <= 36).toBeTruthy();
		});
	});

	// reds 1 3 5 7 9 12 13 16 18 19 21 23 25 27 30 32 34 36

	describe('Return the correct colour', function() {
		it('when given 1', function() {
			spyOn(Math, 'random').and.returnValue(0.03);
			wheel.spin();
			expect(wheel.colour).toEqual('Red');
		});

		it('when given 2', function() {
			spyOn(Math, 'random').and.returnValue(0.06);
			wheel.spin();
			expect(wheel.colour).toEqual('Black');
		});

		it('when given 0', function() {
			// need to stub for 0
			// spyOn(Math, 'random').and.returnValue();
			// wheel.spin();
			wheel.number = 0;
			wheel.setColour();
			expect(wheel.colour).toEqual('Green');
		});
	});

	describe('Returns correct odd/even', function() {
		it('when given 1', function() {
			spyOn(Math, 'random').and.returnValue(0.03);
			wheel.spin();
			expect(wheel.oddOrEven).toEqual('Odd');
		});

		it('when given 2', function() {
			spyOn(Math, 'random').and.returnValue(0.06);
			wheel.spin();
			expect(wheel.oddOrEven).toEqual('Even');
		});

		it('when given 0', function() {
			wheel.number = 0;
			wheel.isOddOrEven();
			expect(wheel.oddOrEven).toEqual('Zero');
		});
	});

	describe('Returns correct column number', function() {
		it('when given 1', function() {
			spyOn(Math, 'random').and.returnValue(0.03);
			wheel.spin();
			expect(wheel.columnNumber).toEqual(1);
		});
	});

	describe('Returns correct dozen number', function() {
		it('when given 1', function() {
			spyOn(Math, 'random').and.returnValue(0.03);
			wheel.spin();
			expect(wheel.dozenNumber).toEqual(1);
		});
	});

});