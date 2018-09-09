import React, { Component } from 'react';
import { SiteContainer } from './styles';
import Puzzle from '../Puzzle';

class App extends Component {
  render() {
    return (
      <SiteContainer>
        <Puzzle rows={4} columns={4}/>
      </SiteContainer>
    ) 
  }
}

export default App;