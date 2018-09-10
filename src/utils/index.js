export const shuffle = array => {
  while(true) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    
    if(isSolvable(array)) {
      return array;
    }
  }
}

export const countInversions = array => {
  const arrayWithNoZero = array.filter(item => item != 0);
  let ctr = 0;

  for (let i = 0; i < arrayWithNoZero.length; i++) {
    for (let j = i + 1; j < arrayWithNoZero.length; j++) {
      if (arrayWithNoZero[i] > arrayWithNoZero[j]) {
        ctr++;
      }  
    }
  }
  
  return ctr;
}


export const isSolvable = puzzle => {
  
  const gridWidth = Math.sqrt(puzzle.length);
  let row = 0;
  let blankRow = 0;

  for (let i = 0; i < puzzle.length; i++) {
    if (i % gridWidth == 0) {
        row++;
    }
    
    if (puzzle[i] == 0) {
      blankRow = row;
    }
  }
  
  if (gridWidth % 2 == 0) {
    if (blankRow % 2 == 0) {
      return countInversions(puzzle) % 2 == 0;
    } else {
      return countInversions(puzzle) % 2 != 0;
    }
  } else {
    return countInversions(puzzle) % 2 == 0;
  }
}













