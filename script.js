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
    createBoard();
    if (checkWin(player)) {
      endGame("You win!");
    } else if (boardFull()) {
      endGame("It's a tie!");
    } else {
      setTimeout(() => {
        let move = getBestMove();
        board[move] = computer;
        createBoard();
        if (checkWin(computer)) {
          endGame("Computer wins!");
        } else if (boardFull()) {
          endGame("It's a tie!");
        }
      }, 300);
    }
  }
}

function getBestMove() {
  let bestScore = -Infinity;
  let move = -1;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = computer;
      let score = minimax([...board], 0, false);
      board[i] = "";

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(b, depth, isMaximizing) {
  if (checkWinFor(b, computer)) return 10 - depth;
  if (checkWinFor(b, player)) return depth - 10;
  if (b.every(cell => cell !== "")) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < b.length; i++) {
      if (b[i] === "") {
        b[i] = computer;
        let score = minimax([...b], depth + 1, false);
        bestScore = Math.max(score, bestScore);
        b[i] = "";
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < b.length; i++) {
      if (b[i] === "") {
        b[i] = player;
        let score = minimax([...b], depth + 1, true);
        bestScore = Math.min(score, bestScore);
        b[i] = "";
      }
    }
    return bestScore;
  }
}

function checkWinFor(b, current) {
  return winningCombos.some(combo =>
    combo.every(index => b[index] === current)
  );
}


  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = computer;
        let score = minimax(newBoard, depth + 1, false);
        newBoard[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < newBoard.length; i++) {
      if (newBoard[i] === "") {
        newBoard[i] = player;
        let score = minimax(newBoard, depth + 1, true);
        newBoard[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWin(current) {
  return winningCombos.some(combo =>
    combo.every(index => board[index] === current)
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
