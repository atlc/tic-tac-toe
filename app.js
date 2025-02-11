// Winning condition arrays - Each array represents positions that result in a win
// Board positions are numbered 0-8, left to right, top to bottom
const xAxisWins = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8]  // Bottom row
]

const yAxisWins = [
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8]  // Right column
]   

const diagonalWins = [
    [0, 4, 8], // Top-left to bottom-right
    [2, 4, 6]  // Top-right to bottom-left
]

// Combine all possible winning combinations into a single array
const winningConditions = [...xAxisWins, ...yAxisWins, ...diagonalWins]

// Game state variables to track current game status
let currentPlayer = "X";  // Tracks whose turn it is (X or O)
let moves = 0;           // Count of moves made in the current game
let winFound = false;    // Flag to indicate if someone has won

// Game functions
/**
 * Checks if the current player has won after their move
 * Only starts checking after 5 moves since wins aren't possible before then
 * @returns {boolean} Whether a win was found
 */
function checkForWins() {
    if (moves < 5) { 
        return;
    }

    winningConditions.forEach(row => {
        const [index_1, index_2, index_3] = row;
        const cellOneText = cells[index_1].innerText;
        const cellTwoText = cells[index_2].innerText;
        const cellThreeText = cells[index_3].innerText;

        // Check if all three positions contain the current player's symbol
        if (cellOneText === currentPlayer && cellTwoText === currentPlayer && cellThreeText === currentPlayer) {
            winFound = true;

            if (winFound) {
                // Update UI to show winner
                playerHeader.innerText = "Player " + currentPlayer + " wins!";
                // Remove click listeners to prevent further moves
                for (let i = 0; i < cells.length; i++) {
                    cells[i].removeEventListener('click', cellClicked);
                }
            }
        }
    });
    return winFound;
}

/**
 * Handles cell click events for making moves
 * @param {Event} event - The click event object
 */
function cellClicked(event) {
    // Prevent moves in already filled cells
    if (event.target.innerText !== "") {
        return;
    }

    moves += 1;
    event.target.innerText = currentPlayer;
    
    const isOver = checkForWins();

    // If game is won, show reset button and end turn
    if (isOver) {
        resetButton.hidden = false;
        return;
    }

    // Switch to other player and update UI
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerHeader.textContent = "Turn: Player " + currentPlayer;
}

/**
 * Resets the game state to start a new game
 * Clears all cells and resets tracking variables
 */
function resetGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    }

    currentPlayer = "X";
    moves = 0;
    winFound = false;
}

// Initialize the game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get references to DOM elements needed for the game
    const playerHeader = document.getElementById("player");
    const resetButton = document.getElementById("reset");
    const cells = document.getElementsByClassName('cell');
    
    // Hide reset button initially
    resetButton.hidden = true;
    
    // Set up event listeners
    resetButton.addEventListener("click", resetGame);

    // Add click handlers to all cells
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', cellClicked)
    }
});