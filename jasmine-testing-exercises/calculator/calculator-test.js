
it('should calculate the monthly payment correctly', function () {
  // ...
  const values = {amount: 10000, years : 10, rate : 2};
  expect(calculateMonthlyPayment(values)).toEqual(`92.01`);

});


it("should return a result with 2 decimal places", function() {
  // ..
  const values = {amount: 10043, years:8, rate:5.8};
  expect(calculateMonthlyPayment(values)).toEqual('131.00');
});

it("should output a NaN if values are not numbers",function(){
  const values={amount: `test`, years:10 ,rate:2};
  expect(calculateMonthlyPayment(values)).toEqual('NaN');
  values.amount = 10000;
  values.years = `test`;
  expect(calculateMonthlyPayment(values)).toEqual('NaN');
  values.years = 10;
  values.rate = `test`;
  expect(calculateMonthlyPayment(values)).toEqual('NaN');
});



/// etc
