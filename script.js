let board = ["", "", "", "", "", "", "", "", ""];
const player = "X";
const computer = "O";
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
    if (cell !== "" || gameOver) div.classList.add("disabled");
    div.addEventListener("click", handleClick);
    boardDiv.appendChild(div);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] === "" && !gameOver) {
    board[index] = player;
    createBoard();
    if (checkWin(board, player)) return endGame("You win!");
    if (isFull(board)) return endGame("It's a tie!");

    setTimeout(() => {
      const move = computerMove();
      if (move !== -1) board[move] = computer;
      createBoard();
      if (checkWin(board, computer)) return endGame("Computer wins!");
      if (isFull(board)) return endGame("It's a tie!");
    }, 200);
  }
}

function checkWin(b, p) {
  return winningCombos.some(combo =>
    combo.every(index => b[index] === p)
  );
}

function isFull(b) {
  return b.every(cell => cell !== "");
}

function canMove(index) {
  return board[index] === "";
}

function canWin(b, p, move) {
  let temp = [...b];
  temp[move] = p;
  return checkWin(temp, p);
}

function computerMove() {
  // 1. Can computer win?
  for (let i = 0; i < 9; i++) {
    if (canMove(i) && canWin(board, computer, i)) return i;
  }
  // 2. Can player win? Block them.
  for (let i = 0; i < 9; i++) {
    if (canMove(i) && canWin(board, player, i)) return i;
  }
  // 3. Take center
  if (canMove(4)) return 4;
  // 4. Take a corner
  const corners = [0, 2, 6, 8];
  for (let i of corners) {
    if (canMove(i)) return i;
  }
  // 5. Take a side
  const sides = [1, 3, 5, 7];
  for (let i of sides) {
    if (canMove(i)) return i;
  }
  return -1;
}

function endGame(message) {
  gameOver = true;
  document.getElementById("status").textContent = message;
  createBoard();
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  document.getElementById("status").textContent = "Your turn";
  createBoard();
}

createBoard();
