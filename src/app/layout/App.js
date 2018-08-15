import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          <h1 className="App-title">Revent</h1>
          <button className="ui icon button">
          <i className="smile icon"></i>
          CSS Button
          </button>
            <div className="ui"></div>
          <Button icon="smile" content="React button" />
        </header>
        
      </div>
    );
  }
}

export default App;
