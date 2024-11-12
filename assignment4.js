const moles = document.querySelectorAll('.mole');
const scores = document.getElementById('score');
const clock = document.getElementById('time');
const start = document.getElementById('btn');
const modal = document.getElementById('msg');
const message = document.getElementById('msgs');
const closing = document.querySelector('.msgContent');
const moleSound = new Audio('mole_sound.mp3');
const gameOverSound = new Audio('game_over.mp3');

let score = 0;
let time = 30;
let delay;
let gameInProgress = false;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomMole() {
  const idx = Math.floor(Math.random() * moles.length);
  return moles[idx];
}

function popUp() {
  const mole = randomMole();
  mole.style.display = 'block';
  moleSound.play(); // Play mole popping sound
  setTimeout(() => {
    mole.style.display = 'none';
    if (gameInProgress) {
      popUp();
    }
  }, randomTime(500, 1500));
}

function startGame() {
  score = 0;
  time = 30;
  scores.textContent = score;
  clock.textContent = formatTime(time);
  gameInProgress = true;
  start.disabled = true;

  delay = setInterval(() => {
    time--;
    clock.textContent = formatTime(time);
    if (time === 0) {
      endGame();
    }
  }, 1000);

  popUp();
}

function endGame() {
  clearInterval(delay);
  gameInProgress = false;
  start.disabled = false;
  showModal(`Game Over! Your Score: ${score}`);
  gameOverSound.play(); 
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  scores.textContent = score;
  this.style.display = 'none';
}

function showModal(msg) {
  message.textContent = msg;
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
start.addEventListener('click', startGame);
closing.addEventListener('click', closeModal);
