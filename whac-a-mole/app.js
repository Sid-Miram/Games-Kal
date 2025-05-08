const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const startButton = document.querySelector('#start-btn');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countDownTimerId = null;

function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole');
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('mole');

  hitPosition = randomSquare.id;
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 500);
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert('GAME OVER! Your final score is ' + result);
  }
}

startButton.addEventListener('click', () => {
  // Reset values and start game
  result = 0;
  score.textContent = result;
  currentTime = 60;
  timeLeft.textContent = currentTime;

  clearInterval(countDownTimerId);
  clearInterval(timerId);

  countDownTimerId = setInterval(countDown, 1000);
  moveMole();
});
