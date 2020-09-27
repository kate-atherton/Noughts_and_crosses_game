const initialiseModel = () => {
  // define all the variables that hold state
  //only call this function once, otherwise it will redefine all the variables
  //define all the functions that you want to define to update or view those variables
  //return an object that contains all the functions

  let currentlyPlaying = false;
  let playerArray = [];
  let computerArray = [];

  const checkCurrentlyPlaying = () => currentlyPlaying;
  const updateCurrentlyPlaying = (value) => {
    currentlyPlaying = value;
  };

  const resetPlayerArrays = () => {
    playerArray = [];
    computerArray = [];
  };

  const addCoordsToArray = (square, array) => {
    array.push(getCoordsFromHtml(square));
  };

  const readPlayerArray = () => [...playerArray];
  const readComputerArray = () => [...computerArray];

  return {
    checkCurrentlyPlaying,
    updateCurrentlyPlaying,
    resetPlayerArrays,
    addCoordsToArray,
    readPlayerArray,
    readComputerArray,
  };
};
