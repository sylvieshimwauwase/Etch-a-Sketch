const container = document.querySelector('.container');
const gridSize = 16;

function createGrid(size) {
  container.style.width = `${size * 30}px`;
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
  }
}

function clearGrid() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function changeGridSize() {
  let newSize = prompt('Enter the number of squares per side (max 100):');
  if (newSize === null) return; // Handle cancel button
  newSize = parseInt(newSize);
  if (isNaN(newSize) || newSize <= 0 || newSize > 100) {
    alert('Please enter a valid number between 1 and 100.');
    return;
  }
  clearGrid();
  createGrid(newSize);
  addHoverEffect();
}

function addHoverEffect() {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => {
    square.addEventListener('mouseover', () => {
      const randomColor = `rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()})`;
      square.style.backgroundColor = randomColor;
      darkenSquare(square);
    });
  });
}

function getRandomColorValue() {
  return Math.floor(Math.random() * 256);
}

function darkenSquare(square) {
  let currentOpacity = parseFloat(square.style.opacity) || 0;
  if (currentOpacity < 0.9) {
    currentOpacity += 0.1;
    square.style.opacity = currentOpacity;
    requestAnimationFrame(() => darkenSquare(square));
  }
}

createGrid(gridSize);
addHoverEffect();