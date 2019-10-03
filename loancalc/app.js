document.getElementById('loan-form').addEventListener('submit', function(evt) {

  document.querySelector('.results').classList.add('d-none');
  document.querySelector('#loader').classList.remove('d-none');

  setTimeout(calculate, 1200);

  evt.preventDefault();
});

function calculate(){
  console.log("Calculating");

  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');

  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100/12;
  const calculatedPayments = parseFloat(years.value)*12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly*calculatedPayments) - principal).toFixed(2);

    document.querySelector('.results').classList.remove('d-none');
    document.querySelector('#loader').classList.add('d-none');
  } else {
    showError('Please Check Your Numbers.')
    document.querySelector('.results').classList.add('d-none');
    document.querySelector('#loader').classList.add('d-none');
  }
}

function showError(msg) {
  const errorDiv = document.createElement('div');

  errorDiv.classList.add('alert');
  errorDiv.classList.add('alert-danger');

  errorDiv.appendChild(document.createTextNode(msg));

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  card.insertBefore(errorDiv, heading);

  setTimeout(function() {
    errorDiv.remove();
  }, 1500);
}
