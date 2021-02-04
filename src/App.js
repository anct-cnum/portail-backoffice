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
      <header className="rf-header">
        <div className="rf-container">
          <div className="rf-header__body">
              <div className="rf-header__brand rf-sur-mesure">
                  <a href="#" title="République française" style={{boxShadow: "none"}}>
                      <img src="logos/logoRF.svg" width="96" alt="République Française. Liberté Égalité Fraternité." className="header__logo-rf" />
                  </a>
              </div>
              <div className="rf-header__operator logo-conseiller-numerique">
                  <img src="logos/logo-conseiller-numerique.svg" alt="logo conseiller numérique France Services" />
              </div>
              <div className="rf-header__navbar">
              <div className="rf-service">
                  <h1>
                      Votre espace stucture
                  </h1>
              </div>
            </div>
          </div>
        </div>
      </header>
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
