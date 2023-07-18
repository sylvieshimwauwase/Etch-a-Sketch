const container = document.querySelector('.container');
const gridSizeInput = document.getElementById('grid-size');
const submitBtn = document.getElementById('submit-btn');
const clearBtn = document.getElementById('clear-btn');
const blackBtn = document.getElementById('black-btn');
const redBtn = document.getElementById('red-btn');
const blueBtn = document.getElementById('blue-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const eraserBtn = document.getElementById('eraser-btn');

let gridSize = 16;

function createGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
  }
}

function clearGrid() {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => (square.style.backgroundColor = 'white'));
}

function changeGridSize() {
  let newSize = gridSizeInput.value;
  if (newSize === '') return;
  newSize = parseInt(newSize);
  if (isNaN(newSize) || newSize <= 0 || newSize > 100) {
    alert('Please enter a valid number between 1 and 100.');
    return;
  }
  gridSize = newSize;
  clearGrid();
  createGrid(gridSize);
  addHoverEffect();
}

function setColor(color) {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => (square.style.backgroundColor = color));
}

function addHoverEffect() {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => {
    square.addEventListener('mouseover', () => {
      const color = rainbowBtn.classList.contains('active')
        ? `rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()})`
        : eraserBtn.classList.contains('active')
        ? 'white'
        : blackBtn.classList.contains('active')
        ? 'black'
        : redBtn.classList.contains('active')
        ? 'red'
        : blueBtn.classList.contains('active')
        ? 'blue'
        : '';
      square.style.backgroundColor = color;
    });
  });
}

function getRandomColorValue() {
  return Math.floor(Math.random() * 256);
}

gridSizeInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    changeGridSize();
  }
});

submitBtn.addEventListener('click', changeGridSize);
clearBtn.addEventListener('click', clearGrid);
blackBtn.addEventListener('click', () => setColor('black'));
redBtn.addEventListener('click', () => setColor('red'));
blueBtn.addEventListener('click', () => setColor('blue'));
rainbowBtn.addEventListener('click', () => setColor('rainbow'));
eraserBtn.addEventListener('click', () => setColor('white'));

createGrid(gridSize);
addHoverEffect();
