import { mobile } from '../style/breakpoints';
import config from '../config';

class Game {
  shuffle(array) {
    while(true) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      
      if(this.isSolvable(array)) {
        return array;
      }
    }
  }

  countInversions(array) {
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

  isSolvable(puzzle) {  
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
        return this.countInversions(puzzle) % 2 == 0;
      } else {
        return this.countInversions(puzzle) % 2 != 0;
      }
    } else {
      return this.countInversions(puzzle) % 2 == 0;
    }
  }
  
  getTileWidth() {
    const { mobile: mobileWidth, desktop: desktopWidth } = config.tileSizes;
    
    if(window.innerWidth < mobile) {
      return mobileWidth;
    } else {
      return desktopWidth;
    }
  }
  
  getPuzzleWidth(cols) {
    if(window.innerWidth < mobile) {
      cols = 4;
    }
    return cols * this.getTileWidth();
  }
  
  getPuzzleHeight(rows, cols) {
    if(window.innerWidth < mobile) {
      rows = (rows * cols) / 4;
    }
    return rows * this.getTileWidth();
  }
  
  getCoordinates(rows, cols) {
    if(window.innerWidth < mobile) {
      rows = (rows * cols) / 4;
      cols = 4;
    }
    
    let xOffset = 0;
    let yOffset = 0;
    
    return Array.from(Array(rows * cols).keys()).map(n => {
        if(n === 0) {
          return [this.getTileWidth() * xOffset, this.getTileWidth() * yOffset];
        } else if(n % cols === 0) {
          xOffset = 0;
          yOffset++;
        } else {
          xOffset++;
        }
        
        return [this.getTileWidth() * xOffset, this.getTileWidth() * yOffset];
        
    });
  }
}

export default Game;