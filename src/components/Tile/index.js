import React from 'react';
import { TileWrapper, TileContent } from './styles';

const Tile = ({ position, empty, clickHandler, coordinates }) => {
  return (
    <TileWrapper 
      empty={ empty } 
      coordinates={ coordinates }
      onClick={ clickHandler } 
      data-id={ position }>
      <TileContent>
        { position }        
      </TileContent>
    </TileWrapper>
  )
}

export default Tile;