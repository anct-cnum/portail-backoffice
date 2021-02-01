import './App.css';

import { Router, Redirect, Route, Switch } from 'react-router-dom';
import { history } from './helpers';

import Login from './components/anonymous/Login.js'
import Home from './components/connected/Home.js'

import { PrivateRoute } from './components/connected/PrivateRoute';

require('dotenv').config()

function App() {
  return (
    <div className="App">
      <h1>Back Office</h1>
      <Router history={history}>
        <Switch>

          <Route path="/login" component={Login} />
          <PrivateRoute exact path="*" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
