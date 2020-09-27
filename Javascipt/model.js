const model = () => {
    // define all the variables that hold state
    //only call this function once, otherwise it will redefine all the variables 
    //define all the functions that you want to define to update or view those variables
    //return an object that contains all the functions

    let temp = 0;

    const incrementTemp = () => {
        temp++;
    }

    const readTemp = () => temp;

    return {
        incrementTemp,
        readTemp
    }
}