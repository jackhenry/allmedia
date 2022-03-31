import Calculator from '@allmedia/q1';

const HEIGHT_AND_WIDTH = 800;
const GRID_LINES = 20;
const SCALE = HEIGHT_AND_WIDTH / GRID_LINES;

type X = number;
type Y = number;
type Coord = [X, Y];

const drawGridLines = (canvasElement: HTMLCanvasElement) => {
  const ctx = canvasElement.getContext('2d');
  for (let i = 1; i <= GRID_LINES; i++) {
    // Draw x grid line
    ctx.beginPath();
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1 / SCALE;
    ctx.moveTo(i, 0);
    ctx.lineTo(i, GRID_LINES);
    ctx.stroke();
    // Draw y grid line
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(GRID_LINES, i);
    ctx.stroke();
  }
};

const drawPairs = (pairs: Coord[], canvas: HTMLCanvasElement) => {
  const firstPair = pairs[0];
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.strokeStyle = 'red';
  // Since canvas coordinate position starts from top left, y coordinate must be translated
  ctx.moveTo(firstPair[0], (GRID_LINES - firstPair[1]));
  // Start at second pair and draw the graph
  for (let i = 1; i < pairs.length; i++) {
    const pair = pairs[i];
    const x = pair[0];
    // Again, y needs to be translated to match traditional coordinate system
    const y = (GRID_LINES - pair[1]);
    ctx.lineTo(x, y);
  }
  ctx.stroke();
};

/**
 * Generates 20 coordinate pairs to be graphed
 * @param value the string input taken from dom
 * @returns 20 coordinate pairs
 */
const generatePairs = (value: string) => {
  // Get the tokens
  const tokens: string[] = Calculator.lex(value);
  // Here, it would be wise to do some error checking. However, I ran out of time.
  // Mostly to ensure that there are no garbage lexemes.
  if (tokens[0] === 'y=') tokens.shift();

  // Generate coordinate pairs by replacing the x value with a concrete value
  const pairs: Coord[] = [];
  for (let x = 0; x <= GRID_LINES; x++) {
    // Substitute x with a concrete value
    const concreteEquation = value.replace('x', `${x}`);
    const concreteTokens = Calculator.lex(concreteEquation);
    // Remove the y= token
    concreteTokens.shift();
    const y = Calculator.evaluate(concreteTokens.join(''));
    pairs.push([x, y]);
  }

  return pairs;
};

/**
 * Scales canvas since the lines would be tiny if we mapped one pixel to each x/y value
 * @param canvas
 */
const scaleCanvas = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');
  ctx.scale(SCALE, SCALE);
};

// Wait for DOM to load before getting elements
window.addEventListener('DOMContentLoaded', () => {
  const submitElement = document.getElementById('submit-equation-button') as HTMLButtonElement;
  const inputElement = document.getElementById('equation-input') as HTMLInputElement;
  const canvasElement = document.getElementById('graph-canvas') as HTMLCanvasElement;

  scaleCanvas(canvasElement);
  drawGridLines(canvasElement);

  submitElement.addEventListener('click', (event) => {
    event.preventDefault();
    const { value } = inputElement;
    const pairs = generatePairs(value);
    drawPairs(pairs, canvasElement);
  });
});
