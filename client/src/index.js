import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route component={App} />
        </Switch>
    </Router>,
    document.getElementById('root'));

// registerServiceWorker();
