const initialiseModel = (onTurnUpdate) => {
  let currentlyPlaying = false;
  let playerArray = [];
  let computerArray = [];
  let turn = "player";

  const checkCurrentlyPlaying = () => currentlyPlaying;
  const updateCurrentlyPlaying = (value) => {
    currentlyPlaying = value;
  };

  let whosTurn = () => turn;

  const checkFirstTurn = () => {
    if (computerArray.length < 1) {
      return true;
    }
  };

  const resetTurn = () => {
    turn = "player";
  };

  const resetPlayerArrays = () => {
    playerArray = [];
    computerArray = [];
  };

  const addCoordsToArray = (square, array) => {
    array.push(square);
  };

  const readPlayerArray = () => [...playerArray];
  const readComputerArray = () => [...computerArray];

  const makePlayerMove = (coords) => {
    addCoordsToArray(coords, playerArray);
    turn = "computer";
    onTurnUpdate();
  };

  const makeComputerMove = (coords) => {
    addCoordsToArray(coords, computerArray);
    turn = "player";
    onTurnUpdate();
  };

  return {
    checkCurrentlyPlaying,
    updateCurrentlyPlaying,
    resetPlayerArrays,
    addCoordsToArray,
    readPlayerArray,
    readComputerArray,
    makePlayerMove,
    makeComputerMove,
    whosTurn,
    resetTurn,
    checkFirstTurn,
  };
};
