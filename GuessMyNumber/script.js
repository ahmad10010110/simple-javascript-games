'use strict';

// Log the text content of the element with class 'title' to the console
console.log(document.querySelector('.title').textContent);

// Option to change the text content of elements in HTML
// document.querySelector('.title').textContent = 'Which Number is in my head? ';
// document.querySelector('.number').textContent = '🤔';

// Initialize state variables
let secretNumber = Math.trunc(Math.random() * 20) + 1; // Random secret number between 1 and 20
let iteration = 0; // Number of guesses made
let score = 20; // Player's current score
let totalScore = 0; // Player's total score across games
let done = false; // Flag to check if the game is over

// Function to display end game states or reset the game
const displayEnd = function (message, emoji, color, buttonType = 'check') {
  // Update message and emoji display
  document.querySelector('.message').textContent = message;
  document.querySelector('.number').textContent = emoji;
  // Change background color and number box size
  document.querySelector('body').style.backgroundColor = color;
  document.querySelector('.number').style.width =
    buttonType === 'again' ? '15rem' : '30rem';
  // Reset score if resetting the game
  score = buttonType === 'again' ? 20 : score;
  document.querySelector('.score').textContent = String(score);
  // Update total score if game is over
  totalScore = buttonType === 'again' ? totalScore : totalScore + score;
  document.querySelector('.highscore').textContent = String(totalScore);
  // Set game state (ongoing or done)
  done = buttonType === 'again' ? false : true;
  // Generate new secret number if resetting
  secretNumber =
    buttonType === 'again' ? Math.trunc(Math.random() * 20) + 1 : secretNumber;
  iteration = 0; // Reset iteration count
};

// Handle click event on 'check' button for guessing
document.querySelector('.check').addEventListener('click', () => {
  if (!done) {
    const guessedNumber = Number(document.querySelector('.guess').value); // Convert input to a number

    if (score > 0) {
      // Case when there's no input
      if (!guessedNumber) {
        document.querySelector('.message').textContent = 'Give me a number!';
        document.querySelector('.score').textContent = String(score);

        // Case when player wins
      } else if (secretNumber === guessedNumber) {
        displayEnd('🎉 Correct!', '😍', '#60b347'); // Display winning message and styles

        // Case when guessed number is incorrect
      } else if (secretNumber !== guessedNumber) {
        // Display hint message based on guess
        document.querySelector('.message').textContent =
          secretNumber > guessedNumber
            ? '❌ It is too Low!'
            : '❌ It is too High!';
        score -= 2 ** iteration; // Decrease score exponentially with attempts
        iteration++; // Increment number of attempts
        document.querySelector('.score').textContent = String(score);
      }

      // Case when player runs out of score
    } else {
      displayEnd('⛔ Game Over!', '😭', '#fa8072'); // Display game over message and styles
    }
  }
});

// Handle click event on 'again' button to reset the game
document.querySelector('.again').addEventListener('click', () => {
  displayEnd('Start guessing...', '🤔', '#222', 'again'); // Reset game state and styles
});
