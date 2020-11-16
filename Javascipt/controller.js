const CIRCLE_PATH = "img/circleImage.jpg";
const CROSS_PATH = "img/crossImage.jpg";
const BLANK_PATH = "img/blankSquare.jpg";
let computerPath = CROSS_PATH;
let playerPath = CIRCLE_PATH;
const CIRCLE_PATH_TURN = "img/circleImageTurn.jpg";
const CROSS_PATH_TURN = "img/crossImageTurn.jpg";
let computerPathTurn = CROSS_PATH_TURN;
let playerPathTurn = CIRCLE_PATH_TURN;

initialRender();

const middleSquare = { x: 1, y: 1 };

const squareCoordinates = gameSquares.map((gameSquare) => {
  return getCoordsFromHtml(gameSquare);
});

const currentlyPlaying = () => {
  if (model.checkCurrentlyPlaying()) {
    return true;
  }
};

const firstTurn = () => {
  if (model.checkFirstTurn()) {
    return true;
  }
};

const makePlayerMove = (coords) => {
  if (
    model.whosTurn() === "player" &&
    squareFree(coords, model.readPlayerArray(), model.readComputerArray())
  ) {
    model.makePlayerMove(coords);
  }
};

const makeComputerMove = (coords) => {
  model.makeComputerMove(coords);
};

const onTurnUpdate = () => {
  let gridInfoPlayer = model.readPlayerArray();
  let gridInfoComp = model.readComputerArray();
  renderGrid(gridInfoPlayer, gridInfoComp);
  renderTurn(model.whosTurn());
  if (model.whosTurn() === "computer") {
    setTimeout(() => {
      computerTurn(model.readPlayerArray(), model.readComputerArray());
    }, 1000);
  }
};

const playerTurn = () => {
  gameSquares.forEach((gameSquare) => {
    if (model.checkCurrentlyPlaying()) {
      gameSquare.addEventListener("click", onPlayerClick);
    }
  });
};

const startRound = () => {
  renderStart();
  model.resetTurn();
  model.resetPlayerArrays();
  model.updateCurrentlyPlaying(true);
  let gridInfoPlayer = model.readPlayerArray();
  let gridInfoComp = model.readComputerArray();
  let turn = model.whosTurn();
  renderGrid(gridInfoPlayer, gridInfoComp);
  renderTurn(turn);
  playerTurn();
};

const gameOver = (status) => {
  renderResult(status);
  model.updateCurrentlyPlaying(false);
};

const model = initialiseModel(onTurnUpdate);
