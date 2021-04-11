const human = -1;
const computer = +1;

const NOUGHT_PATH = "img/noughtImage.jpg";
const CROSS_PATH = "img/crossImage.jpg";
const BLANK_PATH = "img/blankSquare.jpg";

const CROSS_TURN = "img/crossImageTurn.jpg";
const NOUGHT_TURN = "img/noughtImageTurn.jpg";

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

const model = {
  state: {
    moveCount: 0,
    gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    turn: "player",
    computerPath: CROSS_PATH,
    playerPath: NOUGHT_PATH,
    blankPath: BLANK_PATH,
    playerPathTurn: NOUGHT_TURN,
    computerPathTurn: CROSS_TURN,
    currentlyPlaying: false,
  },

  resetBoard: () => {
    model.state.moveCount = 0;
    model.state.gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    model.state.turn = "player";
    model.state.currentlyPlaying = true;
  },

  squareFree: (square) => {
    if (model.state.gameBoard[square] === 0) {
      return true;
    }
  },

  compTurn: () => {
    let bestScore = -1000;
    let bestMove = null;
    let board = model.state.gameBoard;

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

    makeCompMove(bestMove);
  },

  switchSelector: () => {
    model.state.computerPath = [
      model.state.playerPath,
      (model.state.playerPath = model.state.computerPath),
    ][0];

    model.state.computerPathTurn = [
      model.state.playerPathTurn,
      (model.state.playerPathTurn = model.state.computerPathTurn),
    ][0];
  },

  checkResult: (handler) => {
    if (evaluateScore(model.state.gameBoard) !== undefined) {
      return handler(evaluateScore(model.state.gameBoard));
    }
  },

  makePlayerMove: (square) => {
    model.state.gameBoard[square] = -1;
    updateTurn("computer");
    model.state.moveCount++;
  },
};

const updateTurn = (turn) => {
  model.state.turn = turn;
};

const makeCompMove = (square) => {
  model.state.gameBoard[square] = 1;
  model.state.moveCount++;
  updateTurn("player");
};
