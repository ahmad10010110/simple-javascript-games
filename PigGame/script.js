'use strict';

// Initialize player scores and game state variables
let totalPlayersScore = [0, 0]; // Scores for both players
let currentScore = 0; // Score for the current round
let currentPlayer = 0; // Index of the current player (0 or 1)
let winner = 2; // Winner status (2 means no winner yet)

// Function to handle dice roll
const role = function () {
  // Show the dice image
  document.querySelector('.dice').classList.remove('hidden');

  // Roll a random dice value between 1 and 6
  let dice = Math.trunc(Math.random() * 6) + 1;

  // Update current score, reset if dice is 1
  currentScore = dice === 1 ? 0 : dice + currentScore;

  // Update dice image based on roll
  document.querySelector('.dice').src = `dice-${dice}.png`;

  // Display current score for active player
  document.querySelector(`#current--${currentPlayer}`).textContent =
    currentScore;

  // Check if dice roll is 1
  if (dice === 1) {
    totalPlayersScore[currentPlayer] += currentScore; // Add current score to total
    document.querySelector(`#score--${currentPlayer}`).textContent =
      totalPlayersScore[currentPlayer]; // Update total score display

    // Switch player
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');
    currentPlayer = currentPlayer === 0 ? 1 : 0; // Toggle between players
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--active');
  }
};

// Function to hold the current score
const hold = function () {
  // Hide the dice image
  document.querySelector('.dice').classList.add('hidden');

  // Add current score to the active player's total
  totalPlayersScore[currentPlayer] += currentScore;
  document.querySelector(`#score--${currentPlayer}`).textContent =
    totalPlayersScore[currentPlayer]; // Update total score display

  // Reset current score
  currentScore = 0;
  document.querySelector(`#current--${currentPlayer}`).textContent =
    currentScore;

  // Check for winning condition
  if (totalPlayersScore[currentPlayer] >= 100) {
    console.log('Ended!');
    winner = currentPlayer; // Set winner
    document
      .querySelector(`.player--${winner}`)
      .classList.add('player--winner'); // Highlight winner
    document.querySelector(`#name--${winner}`).textContent = '😍 YOU WIN!'; // Display win message
    document.querySelector('.dice').classList.add('hidden');
    document.querySelector('.btn--roll').classList.add('hidden'); // Disable roll button
    document.querySelector('.btn--hold').classList.add('hidden'); // Disable hold button
    currentPlayer = 0; // Reset to first player
    return;
  }

  // Switch player
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
  currentPlayer = currentPlayer === 0 ? 1 : 0; // Toggle between players
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');
};

// Function to start a new game
const newGame = function () {
  // Reset winner display if there was a winner
  if (winner < 2) {
    document
      .querySelector(`.player--${winner}`)
      .classList.remove('player--winner');
    document.querySelector(`#name--${winner}`).textContent = `PLAYER ${
      winner + 1
    }`;
  }

  // Reset game state
  document.querySelector('.dice').classList.add('hidden');
  document.querySelector('.btn--roll').classList.remove('hidden');
  document.querySelector('.btn--hold').classList.remove('hidden');
  totalPlayersScore = [0, 0];
  document.querySelector(`#score--0`).textContent = totalPlayersScore[0];
  document.querySelector(`#score--1`).textContent = totalPlayersScore[1];
  currentScore = 0;
  document.querySelector(`#current--0`).textContent = currentScore;
  document.querySelector(`#current--1`).textContent = currentScore;

  // Ensure player 0 is active at the start
  if (
    !document.querySelector(`.player--0`).classList.contains('player--active')
  ) {
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.add('player--active');
  }
};

// Event listeners for buttons
document.querySelector('.btn--roll').addEventListener('click', role);
document.querySelector('.btn--hold').addEventListener('click', hold);
document.querySelector('.btn--new').addEventListener('click', newGame);
