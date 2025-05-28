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
      const move = getBestMove(board);
      board[move] = computer;
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

function getBestMove(b) {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < b.length; i++) {
    if (b[i] === "") {
      b[i] = computer;
      let score = minimax([...b], 0, false);
      b[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(b, depth, isMax) {
  if (checkWin(b, computer)) return 10 - depth;
  if (checkWin(b, player)) return depth - 10;
  if (isFull(b)) return 0;

  if (isMax) {
    let best = -Infinity;
    for (let i = 0; i < b.length; i++) {
      if (b[i] === "") {
        b[i] = computer;
        best = Math.max(best, minimax([...b], depth + 1, false));
        b[i] = "";
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < b.length; i++) {
      if (b[i] === "") {
        b[i] = player;
        best = Math.min(best, minimax([...b], depth + 1, true));
        b[i] = "";
      }
    }
    return best;
  }
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
