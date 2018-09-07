import React, { Component } from 'react';
import { SiteContainer } from './styles';
import Puzzle from '../Puzzle';

class App extends Component {
  render() {
    return (
      <SiteContainer>
        <Puzzle rows={3} columns={3}/>
      </SiteContainer>
    ) 
  }
}

export default App;