import React, { Component } from 'react';
import forest from './forest.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={forest} className="bg" alt="forest"/>
      <h4 className="title">WELCOME TO PROGRESSIVE WEB APP</h4>

      </div>
    );
  }
}

export default App;
