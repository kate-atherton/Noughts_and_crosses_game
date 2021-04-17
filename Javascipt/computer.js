const gameOver = (player, board) => {
  if (
    (board[0] === player && board[1] === player && board[2] === player) ||
    (board[3] === player && board[4] === player && board[5] === player) ||
    (board[6] === player && board[7] === player && board[8] === player) ||
    (board[0] === player && board[3] === player && board[6] === player) ||
    (board[1] === player && board[4] === player && board[7] === player) ||
    (board[2] === player && board[5] === player && board[8] === player) ||
    (board[0] === player && board[4] === player && board[8] === player) ||
    (board[2] === player && board[4] === player && board[6] === player)
  ) {
    return true;
  } else {
    return false;
  }
};

const gameDraw = (board) => {
  if (board.every((square) => square !== 0)) {
    return true;
  }
};

const getPossibleMoves = (board) => {
  let possibleMoves = [];
  board.forEach((square, index) => {
    if (square === 0) {
      possibleMoves.push(index);
    }
  });
  return possibleMoves;
};

const evaluateScore = (board) => {
  if (gameOver(computer, board)) {
    return 1;
  } else if (gameOver(human, board)) {
    return -1;
  } else if (gameDraw(board)) {
    return 0;
  }
};

const minimax = (isMaxTurn, board) => {
  if (evaluateScore(board) !== undefined) {
    return evaluateScore(board);
  }

  let scores = [];
  let possibleMoves = getPossibleMoves(board);

  possibleMoves.forEach((move) => {
    isMaxTurn ? (board[move] = 1) : (board[move] = -1);
    scores.push(minimax(!isMaxTurn, board));
    board[move] = 0;
  });

  return isMaxTurn
    ? Math.max.apply(Math, scores)
    : Math.min.apply(Math, scores);
};

const calculateBestMove = (board) => {
  let bestScore = -1000;
  let bestMove = null;

  let possibleMoves = getPossibleMoves(board);

  possibleMoves.forEach((move) => {
    board[move] = 1;
    let score = minimax(false, board);
    board[move] = 0;
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  });

  return bestMove;
};
