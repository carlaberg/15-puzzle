import React, { Component, Fragment } from 'react';
import { PuzzleContainer, GameStats, PuzzleHeader, Title, NewGameButton, WinMessage } from './styles';
import { mobile } from '../../style/breakpoints';
import Game from '../../lib/Game';
import Timer from '../../lib/Timer';
import Tile from '../Tile';
import Modal from '../Modal';

class PuzzleGame extends Component {
  constructor(props) {
    super(props);
    
    this.puzzle = new Game(props);
    this.timer = new Timer();
    this.timeElement = React.createRef();
    this.handleTileClick = this.handleTileClick.bind(this);
    
    this.state = {
      positions: this.puzzle.shuffle(Array.from(Array(props.rows * props.columns).keys())),
      coordinates: this.puzzle.getCoordinates(props.rows, props.columns),
      time: 0,
      moves: 0,
      showModal: false
    };
  }
  
  componentDidMount() {
    const timeEl = this.timeElement.current;
    this.timer.start(() => this.timer.printTime(this.timeElement.current));
  }
  
  newGame() {
    const { rows, columns } = this.props;
    this.setState({
      positions: this.puzzle.shuffle(Array.from(Array(rows * columns).keys())),
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
            clickHandler={ this.handleTileClick } 
            coordinates={ coordinates[positions.indexOf(index)] }
          />
        )
      }
    }); 
  }
  
  handleTileClick(e) {
    const { positions, coordinates } = this.state;
    
    const newPositions = this.puzzle.checkIfMovable(e, positions, coordinates);
    if(!newPositions) return;
    this.setState(state => ({ 
      positions: newPositions,
      moves: state.moves + 1
    }));
    if(this.puzzle.isWin(positions)) {
      this.puzzle.onWin(() => this.setState({ showModal: true, time: this.timer.getTime() }));
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
          width={ this.puzzle.getPuzzleWidth(columns) } 
          height={ this.puzzle.getPuzzleHeight(rows, columns) }
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