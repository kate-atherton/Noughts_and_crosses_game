const human = -1;
const computer = +1;
let computerShape = cross;
let playerShape = circle;

const CIRCLE_PATH = "img/circleImage.jpg";
const CROSS_PATH = "img/crossImage.jpg";
const BLANK_PATH = "img/blankSquare.jpg";

const model = {
  state: {
    moveCount: 0,
    gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    turn: "player",
    computerPath: CROSS_PATH,
    playerPath: CIRCLE_PATH,
    blankPath: BLANK_PATH,
  },

  squareFree: (square) => {
    if (model.state.gameBoard[square] === 0) {
      return true;
    }
  },

  //decides computer turn
  compTurn: () => {
    let square;
    let numEmpty = 9 - model.state.moveCount;

    //if first move, random choice
    if (model.state.moveCount === 0) {
      square = parseInt(Math.random() * 3);
    }
    //otherwise, call minimax algorithm to decide move
    else {
      square = minimax(model.state.gameBoard, numEmpty, computer);
    }

    makeCompMove(square[0]);
  },

  switchSelector: () => {
    model.state.computerPath = [
      model.state.playerPath,
      (model.state.playerPath = model.state.computerPath),
    ][0];
  },
};

const updateTurn = (turn) => {
  model.state.turn = turn;
};

const gameOver = (player, state) => {
  let playerMoves = [];
  state.forEach((square, index) => {
    if (square === player) {
      playerMoves.push(index);
    }
  });

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //check if playermoves contains all of one of the winning combinations
  for (let i = 0; i < winningCombinations.length; i++) {
    let combo = winningCombinations[i];
    const isMatch = (num) => playerMoves.includes(num);
    if (combo.every(isMatch)) {
      return true;
    }
  }

  return false;
};

//need a way of passing in what human and comp values are
const gameOverAll = (state) => {
  return gameOver(human, state) || gameOver(computer, state);
};

/* Function to heuristic evaluation of state. */
const evaluateScore = (state) => {
  if (gameOver(computer, state)) {
    return 1;
  } else if (gameOver(human, state)) {
    return -1;
  }
};

const minimax = (state, depth, player) => {
  let best;
  if (player === 1) {
    best = [-1, -1000];
  } else {
    best = [-1, +1000];
  }

  //returns who has won
  if (depth === 0 || gameOverAll(state)) {
    let score = evaluateScore(state);
    return [-1, score];
  }

  //each valid move
  let emptySquares = [];

  state.forEach((square, index) => {
    if (square === 0) {
      emptySquares.push(index);
    }
  });

  emptySquares.forEach((square) => {
    //square is number. for them it is a cell with x and y

    state[square] = player;

    let score = minimax(state, depth - 1, -player);

    // debugger;
    state[square] = 0;
    score[0] = square;
    // debugger;

    if (player === 1) {
      //   debugger;
      if (score[1] > best[1]) {
        best = score;
      }
    } else if (score[1] < best[1]) {
      //   debugger;
      best = score;
    }
  });

  return best;
};

//is this repetitive? There are some differences
const makePlayerMove = (square) => {
  model.state.gameBoard[square] = -1;
  updateTurn("computer");
  model.state.moveCount++;
};

const makeCompMove = (square) => {
  model.state.gameBoard[square] = 1;
  model.state.moveCount++;
  updateTurn("player");
};
