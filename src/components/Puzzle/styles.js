import styled from 'styled-components';
import { desktop } from '../../style/breakpoints';

export const PuzzleContainer = styled.div`
  width: ${props => props.width + 'px'};
  height: ${props => props.height + 'px'};
  margin: 30px 0;
  flex-shrink: 0;
`

export const PuzzleHeader = styled.div`
  text-align: center;
`

export const GameStats = styled.div`
  width: ${({ width }) => (width - 10) + 'px'};
  transform: translateX(5px);
  font-weight: bold;
  
  @media (min-width: ${ desktop + 'px'}) {
    margin-bottom: 30px;
  }
`

export const Title = styled.h1`
  font-size: 30px;
  margin: 20px 0 0;
  
  @media (min-width: ${ desktop + 'px'}) {
    font-size: 50px;
    margin-top: 30px;
  }
`

export const NewGameButton = styled.button`
    background: ${({ background }) => background || '#14181C'};
    padding: 20px;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    outline: none;
    margin-bottom: 30px;
`

export const WinMessage = styled.div`
  font-size: 50px;
  font-weight: bold;
`