const controlStart = () => {
  model.resetBoard();
  view.createBoard(model.state);
  if (model.state.currentlyPlaying) {
    controlReset();
  } else {
    controlStartGame();
  }
};

const controlStartGame = () => {
  model.startGame();
  view.resetView();
};

const controlReset = () => {
  model.endGame();
  view.revertView();
};

const controlPlayerMove = (square) => {
  if (
    model.state.currentlyPlaying === true &&
    model.state.turn === "player" &&
    model.squareFree(square.id)
  ) {
    model.makePlayerMove(square.id);
    view.createBoard(model.state);
    model.checkResult(controlResult);
    setTimeout(controlCompMove, 1000);
  }
};

const controlCompMove = () => {
  if (model.state.currentlyPlaying === true) {
    model.compTurn();
    view.createBoard(model.state);
    model.checkResult(controlResult);
  }
};

const controlSelector = (selector) => {
  if (!selector.classList.contains("game__turn-selector--active")) {
    model.switchSelector();
    view.switchSelectors();
  }
};

const controlResult = (result) => {
  model.state.currentlyPlaying = false;
  view.renderResult(result);
};

const init = () => {
  view.addHandlerFlip();
  view.addHandlerSelectorClick(controlSelector);
  view.addHandlerStartClick(controlStart);
  view.addHandlerPlayerClick(controlPlayerMove);
};

init();
