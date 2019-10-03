let min=1,
    max=10,
    winningNum = getRandomNumber(),
    guessesLeft = 3;

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(evt) {
  if(evt.target.classList.contains('play-again')) {
    console.log('alpha');
    window.location.reload();
  }
});

guessBtn.addEventListener('click', function(evt) {
  let guess = parseInt(guessInput.value);

  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please Enter a Number between ${min} and ${max}.`, 'red');
  }

  if(guess === winningNum) {
    gameOver(true, `${guess} is Correct!`);
  } else {
    guessesLeft -= 1;
    if(guessesLeft === 0) {
      gameOver(false, `Game Over! The Correct Number was ${winningNum}`);
    } else {
      guessInput.style.borderColor = 'red';
      setMessage(`Guess Not Correct! ${guessesLeft} Guesses Left.`, 'red');
      guessInput.value = '';
    }
  }

  evt.preventDefault();
});

function getRandomNumber() {
  return min + Math.floor(Math.random()*(max-min+1));
}

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

function gameOver(won, msg) {
  guessInput.disabled = true;
  if(won===false) {
    guessInput.style.borderColor = 'red';
    setMessage(msg, 'red');
  } else {
    guessInput.style.borderColor = 'green';
    setMessage(msg, 'green');
  }

  guessBtn.value = 'Play Again';
  guessBtn.className = ' play-again';
}
