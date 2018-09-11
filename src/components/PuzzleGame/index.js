import React, { Component, Fragment } from 'react';
import { PuzzleContainer, GameStats, PuzzleHeader, Title, NewGameButton, WinMessage } from './styles';
import { mobile } from '../../style/breakpoints';
import Game from '../../lib/Game';
const Puzzle = new Game();
import Timer from '../../lib/Timer';
import Tile from '../Tile';
import Modal from '../Modal';

class PuzzleGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positions: Puzzle.shuffle(Array.from(Array(props.rows * props.columns).keys())),
      coordinates: Puzzle.getCoordinates(props.rows, props.columns),
      time: 0,
      moves: 0,
      showModal: false
    };
    
    this.timer = new Timer();
    this.timeElement = React.createRef();
    this.updateBoard = this.updateBoard.bind(this);
    this.onWin = this.onWin.bind(this);
  }
  
  componentDidMount() {
    const timeEl = this.timeElement.current;
    this.timer.start(() => this.timer.printTime(this.timeElement.current));
  }
  
  newGame() {
    const { rows, columns } = this.props;
    this.setState({
      positions: Puzzle.shuffle(Array.from(Array(rows * columns).keys())),
      time: 0,
      moves: 0
    });
    
    this.timeElement.current.innerHTML = '0m 0s';
    this.timer.stop();
    this.timer.start(() => this.timer.printTime(this.timeElement.current));
  }
  
  layOutTiles() {
    const { positions, coordinates } = this.state;
    return positions.map((item, index) => {
      
      if(index === 0) {
        return (
            <Tile 
              empty={ true } 
              key={ index } 
              position={ index } 
              coordinates={ coordinates[positions.indexOf(index)] } 
            />
        )
      } else {
        return (
          <Tile 
            key={ index } 
            position={ index } 
            clickHandler={ this.updateBoard } 
            coordinates={ coordinates[positions.indexOf(index)] }
          />
        )
      }
    }); 
  }
  
  isWin() {
    const { positions } = this.state;
    return Puzzle.countInversions(positions) === 0 && positions[positions.length - 1] === 0;
  }
  
  onWin() {
    this.setState({ showModal: true, time: this.timer.getTime() });
  }
  
  updateBoard(e) {
    const { positions, coordinates } = this.state;
    const { columns } = this.props;
    
    const clickedIndex = positions.indexOf(parseInt(e.target.getAttribute('data-id')));
    const emptyIndex = positions.indexOf(0);
    
    const distance = Math.abs(clickedIndex - emptyIndex);
    const colCount = window.innerWidth < mobile ? 4 : columns;
    
    if(distance == 1 || distance == colCount) {
      const matches = coordinates[clickedIndex].filter((item, index) => item === coordinates[emptyIndex][index]);
      if(matches.length === 0) return;
      positions[emptyIndex] = parseInt(e.target.getAttribute('data-id'));
      positions[clickedIndex] = 0;
      this.setState(state => ({ 
        positions,
        moves: state.moves + 1
      }), () => {
        if(this.isWin()) this.onWin();
      });
    }
  }
  
  render() {
    const { columns, rows } = this.props;
    const { time, moves, showModal } = this.state;
    
    return (
      <Fragment>
        <PuzzleHeader>
          <Title>15 Puzzle</Title>
          <GameStats width={ this.puzzleWidth } height={ this.puzzleHeight}>
            <div>Time: <span ref={ this.timeElement }>0m 0s</span></div>
            <div>Moves: { moves }</div>
          </GameStats>
        </PuzzleHeader>
        <PuzzleContainer 
          columns={ columns } 
          width={ Puzzle.getPuzzleWidth(columns) } 
          height={ Puzzle.getPuzzleHeight(rows, columns) }
        >
          {this.layOutTiles()}
        </PuzzleContainer>
        <NewGameButton onClick={ () => this.newGame() }>New Game</NewGameButton>
        <Modal toggle={ () => this.setState(state => ({ showModal: !state.showModal }))} on={ showModal }>
          {() => (
            <Fragment>
              <WinMessage>You won!</WinMessage>
              <GameStats width={ this.puzzleWidth } height={ this.puzzleHeight }>
                <div style={{textAlign: 'center'}}>Time: { time }</div>
                <div style={{textAlign: 'center'}}>Moves: { moves }</div>
              </GameStats>
              <NewGameButton onClick={ () => this.newGame() } background='#42434F'>New Game</NewGameButton>
            </Fragment>
          )}
        </Modal>
      </Fragment>
    )
  }
}

export default PuzzleGame;