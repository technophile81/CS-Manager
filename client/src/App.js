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
            <h1 className="App-title">This is my silly app</h1>
          </header>
          <p className="App-intro">
            Making sure this is working. Much testing! Why are you not routing?
        </p>

          <Route exact path="/materials" render={
            (props) => {
              return(<MaterialList {...props} />)
            }
          } />

        </div>
       </Router> 
    );
  }
}

export default App;
