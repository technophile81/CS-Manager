import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import { Router, Route, Redirect } from "react-router-dom";
import history from "./history"

import MaterialList from './pages/MaterialList';
import PostMaterial from './pages/PostMaterial';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">This is my silly app</h1>
          </header>
          <p className="App-intro">
            Making sure this is working. Much testing! Why are you not routing?
        </p>
<PostMaterial />
         <Route exact path="/post" component={PostMaterial}
         />

          {/* <Route exact path="/materials" render={
            (props) => {
              return(<MaterialList {...props} />)
            }
          } /> */}

        </div>
        </Router>
    );
  }
}

export default App;
