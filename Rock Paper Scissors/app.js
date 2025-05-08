const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const progressBar = document.getElementById('progress');
const resetButton = document.getElementById('reset');

const possibleChoices = document.querySelectorAll('.choices button');

let playerScore = 0;
let computerScore = 0;
let round = 0;

possibleChoices.forEach(choice => choice.addEventListener('click', (e) => {
  const userChoice = e.target.id;
  const computerChoice = generateComputerChoice();
  const result = determineResult(userChoice, computerChoice);

  userChoiceDisplay.innerText = userChoice;
  computerChoiceDisplay.innerText = computerChoice;
  resultDisplay.innerText = result;

  updateScore(result);
  updateProgress();
  checkGameEnd();
}));

function generateComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function determineResult(player, computer) {
  if (player === computer) return 'It\'s a draw!';
  if ((player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')) {
    return 'You win!';
  }
  return 'You lose!';
}

function updateScore(result) {
  if (result === 'You win!') playerScore++;
  if (result === 'You lose!') computerScore++;

  playerScoreDisplay.innerText = playerScore;
  computerScoreDisplay.innerText = computerScore;
}

function updateProgress() {
  round++;
  const progressPercent = (round / 5) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function checkGameEnd() {
  if (round >= 5) {
    resultDisplay.innerText = playerScore > computerScore ? 'Game Over: You Win!' : 'Game Over: You Lose!';
    disableButtons();
  }
}

function disableButtons() {
  possibleChoices.forEach(button => button.disabled = true);
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  round = 0;

  playerScoreDisplay.innerText = playerScore;
  computerScoreDisplay.innerText = computerScore;
  userChoiceDisplay.innerText = '-';
  computerChoiceDisplay.innerText = '-';
  resultDisplay.innerText = '-';
  progressBar.style.width = '0';

  possibleChoices.forEach(button => button.disabled = false);
}
