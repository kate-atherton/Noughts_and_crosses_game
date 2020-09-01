const isCorner = ({x, y}) => { 
    if (x !== 1 && y !== 1) { 
        return true
    }
    return false;
}

const isMatch = (coords1, coords2) => {
    if (coords1.x === coords2.x && coords1.y === coords2.y) {
        return true
    } 
    return false;
}

const getOpposingCorners = (array) => { 
    const differenceofTwo = (a, b) => { 
        if (Math.abs(a - b) === 2) { 
            return true
        } 
        return false 
    }
    // - Instead of passing an array in this function should just accept two arguments  -- CONFUSED
    if (differenceofTwo(array[0].x, array[1].x) && differenceofTwo(array[0].y, array[1].y)) {
        return true
    } 
    return false
    
}

const getCoordsFromHtml = (squareHtml) => {
    return {x: parseInt(squareHtml.id.substr(6, 1), 10), y: (parseInt(squareHtml.id.substr(7), 10))}
}

const getIdFromCoordinates = (coordinates) => {
    return document.getElementById("square" + coordinates.x + coordinates.y)
}


//get square coordinates from gamesquares in html
const squareCoordinates = gameSquares.map(gameSquare => {
    return getCoordsFromHtml(gameSquare)
})

//randomize order of items in an array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

//check if square is free
const squareFree = (square) => {
    let squareToCheck = square
    if (!(square instanceof Element)) {
        squareToCheck = getIdFromCoordinates(square)
    } 
    if (squareToCheck.src === BLANK_PATH) {
        return true
    } 
}

const isXYUnique = (obj1, obj2) => {
    if (obj1.x !== obj2.x && obj1.y !== obj2.y && !isMatch(obj1, middleSquare) & !isMatch(obj2, middleSquare)) {
        return true;
    }
    return false;
}

const getUniqueXYValues = (array) => { 
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (isXYUnique(array[i], array[j])  && (!isMatch(array[i],middleSquare)) && (!isMatch(array[j],middleSquare))) {
                let uniqueArray = [array[i], array[j]]
                return uniqueArray
            } 
        }
   
     }
    return null   
}


const changeMessageStyle = (message) => {
    message.style.position = "absolute";
    message.style.margin = "auto";
    message.style.left = "0";
    message.style.right = "0";
    message.style.top = "0";
    message.style.bottom = "0";
    message.style.textAlign = "center";
    message.style.fontSize = "30px";
    message.style.fontWeight = "600"
    message.style.marginTop = "37%"


}

const showImage = (id) => {
    id.style.visibility = "visible"
}

const hideImage = (id) => {
    id.style.visibility = "hidden"
}