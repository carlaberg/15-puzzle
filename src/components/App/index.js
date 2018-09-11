import React, { Component } from 'react';
import { SiteContainer } from './styles';
import PuzzleGame from '../PuzzleGame';

class App extends Component {
  render() {
    return (
      <SiteContainer>
        <PuzzleGame rows={4} columns={4}/>
      </SiteContainer>
    ) 
  }
}

export default App;