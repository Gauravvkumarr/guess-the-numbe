let randomNumber = Math.floor(Math.random() * 100) + 1;
let guessField = document.getElementById('guessField');
let guessSubmit = document.getElementById('guessSubmit');
let resultText = document.getElementById('resultText');
let prevGuesses = document.getElementById('prevGuesses');
let attempts = document.getElementById('attempts');
let restartBtn = document.getElementById('restartBtn');
let timerSpan = document.getElementById('timer');
let toggleTheme = document.getElementById('toggleTheme');
let confetti = document.getElementById('confetti');

let guesses = [];
let attemptCount = 0;
let timer = 0;

let timerInterval = setInterval(() => {
  timer++;
  timerSpan.textContent = `${timer}s`;
}, 1000);

guessSubmit.addEventListener('click', () => {
  let userGuess = Number(guessField.value);
  if (!userGuess || userGuess < 1 || userGuess > 100) {
    resultText.textContent = '⚠️ Enter a valid number between 1 and 100.';
    return;
  }

  guesses.push(userGuess);
  prevGuesses.textContent = guesses.join(', ');
  attemptCount++;
  attempts.textContent = attemptCount;

  if (userGuess === randomNumber) {
    resultText.textContent = '🎉 Correct! You nailed it!';
    document.querySelector('.container').style.background = 'var(--success)';
    confetti.innerHTML = '🎊 🎊 🎊 🎊 🎊 🎊 🎊';
    clearInterval(timerInterval);
    guessSubmit.disabled = true;
    guessField.disabled = true;

    setTimeout(() => {
      confetti.innerHTML = '';
    }, 3000);

  } else if (userGuess < randomNumber) {
    resultText.textContent = '📉 Too low!';
  } else {
    resultText.textContent = '📈 Too high!';
  }

  guessField.value = '';
  guessField.focus();
});

restartBtn.addEventListener('click', () => {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  guesses = [];
  attemptCount = 0;
  timer = 0;
  prevGuesses.textContent = 'None';
  attempts.textContent = '0';
  timerSpan.textContent = '0s';
  resultText.textContent = '';
  confetti.innerHTML = '';
  guessSubmit.disabled = false;
  guessField.disabled = false;
  guessField.value = '';
  document.querySelector('.container').style.background = 'var(--card)';
  guessField.focus();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerSpan.textContent = `${timer}s`;
  }, 1000);
});

toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleTheme.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});
