const xAxisWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];

const yAxisWins = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

const diagonalWins = [
    [0, 4, 8],
    [2, 4, 6]
];

const winningConditions = [...xAxisWins, ...yAxisWins, ...diagonalWins];
let currentPlayer = "X";
let moves = 0;
let gameOver = false;

const playerHeader = document.getElementById("player");

const resetButton = document.getElementById("reset");
resetButton.hidden = true;
resetButton.addEventListener("click", resetGame);

const cells = document.getElementsByClassName('cell');
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellClicked);
}

function cellClicked(event) {
    if (event.target.innerText !== "" || gameOver) {
        return;
    }

    moves += 1;
    event.target.innerText = currentPlayer;

    const isWinOrDraw = checkForWins();

    if (isWinOrDraw) {
        resetButton.hidden = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerHeader.textContent = "Turn: Player " + currentPlayer;
}

function checkForWins() {
    if (moves < 5) {
        return false;
    }

    for (let i = 0; i < winningConditions.length; i++) {
        const row = winningConditions[i];
        const [index_1, index_2, index_3] = row;

        const cellOneText = cells[index_1].innerText;
        const cellTwoText = cells[index_2].innerText;
        const cellThreeText = cells[index_3].innerText;

        if (cellOneText === currentPlayer && cellTwoText === currentPlayer && cellThreeText === currentPlayer) {
            gameOver = true;
            playerHeader.innerText = "Player " + currentPlayer + " wins!";
            break;
        }
    }

    if (!gameOver && moves === 9) {
        gameOver = true;
        playerHeader.innerText = "It's a draw!";
    }

    return gameOver;
}

function resetGame() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
    }

    currentPlayer = "X";
    moves = 0;
    gameOver = false;
    playerHeader.innerText = "Click a cell to start";
    resetButton.hidden = true;
}