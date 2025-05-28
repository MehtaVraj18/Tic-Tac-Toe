let board = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let computer = "O";
let gameOver = false;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.textContent = cell;
    if (cell !== "") div.classList.add("disabled");
    div.addEventListener("click", handleClick);
    boardDiv.appendChild(div);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] === "" && !gameOver) {
    board[index] = player;
    if (checkWin(player)) {
      endGame("You win!");
    } else if (boardFull()) {
      endGame("It's a tie!");
    } else {
      computerTurn();
    }
    createBoard();
  }
}

function computerTurn() {
  let move = getBestMove();
  board[move] = computer;
  if (checkWin(computer)) {
    endGame("Computer wins!");
  } else if (boardFull()) {
    endGame("It's a tie!");
  }
}

function getBestMove() {
  // Basic AI: pick first available move (can be improved)
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") return i;
  }
  return -1;
}

function checkWin(player) {
  return winningCombos.some(combo =>
    combo.every(index => board[index] === player)
  );
}

function boardFull() {
  return board.every(cell => cell !== "");
}

function endGame(message) {
  gameOver = true;
  document.getElementById("status").textContent = message;
  document.querySelectorAll(".cell").forEach(cell => cell.classList.add("disabled"));
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  document.getElementById("status").textContent = "Your turn";
  createBoard();
}

createBoard();
