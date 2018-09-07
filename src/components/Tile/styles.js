import styled from 'styled-components';
import { mobile } from '../../style/breakpoints';

export const TileWrapper = styled.div`
  width: 70px;
  height: 70px;
  position: absolute;
  opacity: ${props => props.empty ? '0' : '1'};
  transform: ${({ coordinates }) => `translate3d(${coordinates[0]}px, ${coordinates[1]}px, 0)`};
  transition: transform 0.2s linear;
  padding: 5px;
  
  @media (min-width: ${ mobile + 'px'}) {
    width: 100px;
    height: 100px;
  }
`

export const TileContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #14181C;
  pointer-events: none;
  border-radius: 5px;
`