import { mobile } from '../style/breakpoints';
import config from '../config';

class Game {
  constructor(props) {
    this.columns = props.columns;
  }
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
  
  checkIfMovable(e, positions, coordinates, callback) {
    const clickedIndex = positions.indexOf(parseInt(e.target.getAttribute('data-id')));
    const emptyIndex = positions.indexOf(0);
    
    const distance = Math.abs(clickedIndex - emptyIndex);
    const colCount = window.innerWidth < mobile ? 4 : this.columns;
    
    if(distance == 1 || distance == colCount) {
      const matches = coordinates[clickedIndex].filter((item, index) => item === coordinates[emptyIndex][index]);
      if(matches.length === 0) return false;
      positions[emptyIndex] = parseInt(e.target.getAttribute('data-id'));
      positions[clickedIndex] = 0;
      
      return positions;
    } else {
      return false;
    }
  }
  
  isWin(positions) {
    return this.countInversions(positions) === 0 && positions[positions.length - 1] === 0;
  }
  
  onWin(callback) {
    if(typeof callback === 'function') callback();
  }
}

export default Game;