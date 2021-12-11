window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const initial = {amount : 10000, years : 10, rate : 2}
  const amount = document.querySelector(`#loan-amount`);
  const years = document.querySelector(`#loan-years`);
  const rate = document.querySelector(`#loan-rate`);
  amount.value = initial.amount;
  years.value = initial.years;
  rate.value = initial.rate;
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentValue = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentValue));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const i = values.rate / 100 / 12;
  const n = values.years * 12;
  const P = values.amount;
  return ((P * i) / ( 1 - Math.pow((1 + i), -n))).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyPayment = document.querySelector(`#monthly-payment`);
  if(monthly === 'NaN' || monthly === 'Infinity'){
    monthlyPayment.innerText = `Not a Valid Input!`;
  }
  else{
    monthlyPayment.innerText = `$${monthly}`;
  }
}
