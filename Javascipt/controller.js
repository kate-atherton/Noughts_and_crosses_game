//need to stop timeout function runnning still once player has won!

const controlStart = () => {
  console.log("resetting");
  model.resetBoard();
  view.createBoard(model.state);
  view.resetView();
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

const controlFlipBtn = () => {
  model.switchFlipBtn();
  view.renderBtn(model.state.flipBtnPath);
};

const init = () => {
  view.addHandlerFlip(controlFlipBtn);
  view.renderBtn(model.state.flipBtnPath);
  view.addHandlerSelectorClick(controlSelector);
  view.addHandlerStartClick(controlStart);
  view.addHandlerPlayerClick(controlPlayerMove);
};

init();
