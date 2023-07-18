const container = document.querySelector('.container');
const changeGridBtn = document.getElementById('change-grid-btn');
const colorButtons = document.querySelectorAll('.color-btn');
let currentColor = 'black';
let gridSize = 16;

function createGrid(size) {
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
  }
  updateSquareSize();
}

function clearGrid() {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => (square.style.backgroundColor = 'white'));
}

function changeGridSize() {
  let newSize = prompt('Enter the number of squares per side (max 100):');
  if (newSize === null) return; // Handle cancel button
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

function changeColor(event) {
  currentColor = event.target.classList[1];
}

function addHoverEffect() {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => {
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = currentColor === 'eraser' ? 'white' : currentColor;
    });
  });
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateSquareSize() {
  const squares = document.querySelectorAll('.square');
  const squareSize = 960 / gridSize - 2; // Adjust for borders
  squares.forEach(square => {
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
  });
}

createGrid(gridSize);
addHoverEffect();
changeGridBtn.addEventListener('click', changeGridSize);
colorButtons.forEach(button => button.addEventListener('click', changeColor));
