const $game = document.getElementById('game'),
  $start = document.getElementById('start'),
  $time = document.getElementById('time'),
  $timeHeader = document.getElementById('time-header'),
  $resultHeader = document.getElementById('result-header'),
  $result = document.getElementById('result'),
  $gameTime = document.getElementById('game-time');

let score = 0;
let isGameStarted = false;
const colors = [
  '#DD5E89',
  '#3CD3AD',
  '#861657',
  '#74f2ce',
  '#a40606',
  '#20bf55',
  '#e58c8a',
  '#80ff72',
  '#7ee8fa',
  '#ec9f05',
  '#8693ab',
  '#0d324d',
  '#b91372',
  '#a7acd9',
  '#5aff15',
  '#90d5ec',
];

const setGameScore = () => {
  $result.textContent = score.toString();
};

const endGame = () => {
  $timeHeader.classList.add('hide');
  $resultHeader.classList.remove('hide');
  setGameScore();
  $game.style.backgroundColor = '#ccc';
  $start.classList.remove('hide');
  $game.innerHTML = '';
  isGameStarted = false;
  $gameTime.removeAttribute('disabled');
};
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const renderBox = () => {
  $game.innerHTML = '';
  const box = document.createElement('div');
  const boxSize = getRandom(30, 100);
  const gameSize = $game.getBoundingClientRect();
  const maxTop = gameSize.width - boxSize;
  const maxRight = gameSize.height - boxSize;
  const randomColorIndex = getRandom(0, colors.length);
  box.style.width = box.style.height = boxSize + 'px';
  box.style.backgroundColor = colors[randomColorIndex];
  box.style.position = 'absolute';
  box.setAttribute('data-box', true);
  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.right = getRandom(0, maxRight) + 'px';
  box.style.cursor = 'pointer';
  $game.insertAdjacentElement('afterbegin', box);
};

const startGame = () => {
  score = 0;
  setGameTime();
  $gameTime.setAttribute('disabled', true);
  isGameStarted = true;
  $timeHeader.classList.remove('hide');
  $resultHeader.classList.add('hide');
  $game.style.backgroundColor = '#fff';
  $start.classList.add('hide');
  renderBox();
  const inderval = setInterval(() => {
    let time = parseFloat($time.textContent);
    if (time <= 0) {
      clearInterval(inderval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
};

const handleBoxClick = (e) => {
  if (!isGameStarted) {
    return;
  }
  if (e.target.getAttribute('data-box')) {
    renderBox();
    score++;
  }
};

const setGameTime = () => {
  let time = parseInt($gameTime.value);
  $time.textContent = time.toFixed(1);
};

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);