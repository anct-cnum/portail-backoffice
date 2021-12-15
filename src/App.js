import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers';

import Login from './components/anonymous/Login.js';
import Home from './components/connected/Home.js';
import ChoosePassword from './components/anonymous/createAccount/ChoosePassword';
import { useSelector } from 'react-redux';
import ForgottenPassword from './components/anonymous/ForgottenPassword';
import CandidateSondageForm from './components/anonymous/CandidateSondageForm';
import ConfirmationEmail from './components/anonymous/ConfirmationEmail';
import Footer from './components/common/Footer';
import PrivateRoute from './components/connected/PrivateRoute';

require('dotenv').config();

function App() {

  const exports = useSelector(state => state.exports);
  const downloading = useSelector(state => state?.conseiller?.downloading);

  return (
    <div className="App">
      { (exports?.loading === true || downloading === true) &&
      <div className="wrapperModal"></div>
      }
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/mot-de-passe-oublie" component={ForgottenPassword} />
          <Route path="/renouveler-mot-de-passe/:token" component={ForgottenPassword} />
          <Route path="/inscription/:token" component={ChoosePassword} />
          <Route path="/dites-nous-en-plus-sur-vous/:token" component={CandidateSondageForm} />
          <Route path="/confirmer-email/:token" component={CandidateSondageForm} />
          <Route path="/confirmation-email/:token" component={ConfirmationEmail} />
          <PrivateRoute exact path="*" component={Home} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
