let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const playerTurnElement = document.getElementById('player-turn');
const resetButton = document.getElementById('reset-button');
const newGameButton = document.getElementById('new-game-button');
const resultOverlay = document.getElementById('result-overlay');
const resultMessage = document.getElementById('result-message');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);
newGameButton.addEventListener('click', handleNewGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        showResult(`${currentPlayer} wins!`);
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        showResult(`Draw!`);
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurnElement.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function handleResetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
    });
    playerTurnElement.textContent = `Player X's turn`;
    resultOverlay.style.display = 'none';
}

function handleNewGame() {
    handleResetGame();
    resultOverlay.style.display = 'none';
}

function showResult(message) {
    resultMessage.textContent = message;
    resultOverlay.style.display = 'flex';
}
