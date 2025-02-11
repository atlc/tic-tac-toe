// Winning combinations for horizontal rows
const xAxisWins = [
    [0, 1, 2],  // Top row
    [3, 4, 5],  // Middle row
    [6, 7, 8]   // Bottom row
];

// Winning combinations for vertical columns
const yAxisWins = [
    [0, 3, 6],  // Left column
    [1, 4, 7],  // Middle column
    [2, 5, 8]   // Right column
];

// Winning combinations for diagonals
const diagonalWins = [
    [0, 4, 8],  // Top-left to bottom-right
    [2, 4, 6]   // Top-right to bottom-left
];

// Combine all possible winning combinations into a single array
const winningConditions = [...xAxisWins, ...yAxisWins, ...diagonalWins];

// Game state variables
let currentPlayer = "X";  // Tracks current player (X or O)
let moves = 0;           // Counts number of moves made
let gameOver = false;    // Tracks if game has ended

// DOM element references
const playerHeader = document.getElementById("player");
const resetButton = document.getElementById("reset");
resetButton.hidden = true;
resetButton.addEventListener("click", resetGame);

// Add click event listeners to all cells
const cells = document.getElementsByClassName('cell');
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellClicked);
}

/**
 * Handles cell click events
 * @param {Event} event - The click event object
 */
function cellClicked(event) {
    // Prevent moves on filled cells or after game is over
    if (event.target.innerText !== "" || gameOver) {
        return;
    }

    // Increment move count and update cell text
    moves += 1;
    event.target.innerText = currentPlayer;

    // Check if game is over (win or draw)
    const isWinOrDraw = checkForWins();

    // Show reset button if game is over
    if (isWinOrDraw) {
        resetButton.hidden = false;
        return;
    }

    // Switch to next player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerHeader.textContent = "Turn: Player " + currentPlayer;
}

/**
 * Checks for winning combinations or draw
 * @returns {boolean} - True if game is over (win or draw), false otherwise
 */
function checkForWins() {
    // No possible wins before 5 moves
    if (moves < 5) {
        return false;
    }

    // Check all possible winning combinations
    for (let i = 0; i < winningConditions.length; i++) {
        // Get the current winning combination row from the winningConditions array
        const row = winningConditions[i];
        // Get the three cell indices from the current row
        const [index_1, index_2, index_3] = row;
        // Get the text content of the three cells
        const cellOneText = cells[index_1].innerText;
        const cellTwoText = cells[index_2].innerText;
        const cellThreeText = cells[index_3].innerText;

        // Check if current player has won, breaking out of the loop early if they have
        if (cellOneText === currentPlayer && cellTwoText === currentPlayer && cellThreeText === currentPlayer) {
            gameOver = true;
            playerHeader.innerText = "Player " + currentPlayer + " wins!";
            break;
        }
    }

    // Check for draw (all cells filled with no winner)
    if (!gameOver && moves === 9) {
        gameOver = true;
        playerHeader.innerText = "It's a draw!";
    }

    return gameOver;
}

/**
 * Resets the game state to start a new game
 */
function resetGame() {
    // Revert all cells' text to an empty string
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    }

    // Reset game state variables to their initial values
    currentPlayer = "X";
    moves = 0;
    gameOver = false;
    playerHeader.innerText = "Click a cell to start";
    resetButton.hidden = true;
}