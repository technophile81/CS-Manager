import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import { Router, Route, Redirect } from "react-router-dom";

import MaterialList from './pages/MaterialList';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            Making sure this is working. Much testing!
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

          <Route exact path="/materials" component={this.MaterialList} />

        </div>
      </Router>
    );
  }
}

export default App;
