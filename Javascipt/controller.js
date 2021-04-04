const controlPlayerMove = (square) => {
  if (model.state.turn === "player" && model.squareFree(square.id)) {
    makePlayerMove(square.id);
    view.createBoard(model.state);
    model.compTurn();
    view.createBoard(model.state);
  }
};

const controlSelector = (selector) => {
  if (!selector.classList.contains("game__turn-selector--active")) {
    model.switchSelector();
    view.switchSelectors();
  }
};

const init = () => {
  view.createBoard(model.state);
  view.addHandlerPlayerClick(controlPlayerMove);
  view.addHandlerSelectorClick(controlSelector);
};

init();

// const startRound = () => {
//   renderStart();
//   model.resetTurn();
//   model.resetPlayerArrays();
//   model.updateCurrentlyPlaying(true);
//   let gridInfoPlayer = model.readPlayerArray();
//   let gridInfoComp = model.readComputerArray();
//   let turn = model.whosTurn();
//   renderGrid(gridInfoPlayer, gridInfoComp);
//   renderTurn(turn);
//   playerTurn();
// };

// const gameOver = (status) => {
//   renderResult(status);
//   model.updateCurrentlyPlaying(false);
// };

// const model = initialiseModel(onTurnUpdate);
