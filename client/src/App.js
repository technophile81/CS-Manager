import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import { Router, Route, Redirect } from "react-router-dom";

import MaterialList from './pages/MaterialList';

class App extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">This is my silly app</h1>
          </header>
          <p className="App-intro">
            Making sure this is working. Much testing! Why are you not routing?
        </p>

          {/* <Route exact path="/materials" render={
            (props) => {
              return(<MaterialList {...props} />)
            }
          } /> */}

        </div>
    );
  }
}

export default App;
