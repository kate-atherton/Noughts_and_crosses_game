const human = -1;
const computer = +1;

const NOUGHT_PATH = "img/noughtImage.jpg";
const CROSS_PATH = "img/crossImage.jpg";
const BLANK_PATH = "img/blankSquare.jpg";

const model = {
  state: {
    moveCount: 0,
    gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    turn: "player",
    computerPath: CROSS_PATH,
    playerPath: NOUGHT_PATH,
    blankPath: BLANK_PATH,
    playerPathTurn: NOUGHT_PATH,
    computerPathTurn: CROSS_PATH,
    currentlyPlaying: false,
  },

  resetBoard: () => {
    model.state.moveCount = 0;
    model.state.gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    model.state.turn = "player";
  },

  startGame: () => {
    model.state.currentlyPlaying = true;
  },

  endGame: () => {
    model.state.currentlyPlaying = false;
  },

  squareFree: (square) => {
    if (model.state.gameBoard[square] === 0) {
      return true;
    }
  },

  compTurn: () => {
    let move = calculateBestMove(model.state.gameBoard);
    model.makeCompMove(move);
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
    model.updateTurn("computer");
    model.state.moveCount++;
  },

  makeCompMove: (square) => {
    model.state.gameBoard[square] = 1;
    model.state.moveCount++;
    model.updateTurn("player");
  },

  updateTurn: (turn) => {
    model.state.turn = turn;
  },
};
