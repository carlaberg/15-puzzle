import { mobile } from '../../style/breakpoints';
import config from './config';

class helpers {
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
      console.log(this);
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

export default helpers;