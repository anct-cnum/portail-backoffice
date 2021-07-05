import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers';

import Login from './components/anonymous/Login.js';
import Home from './components/connected/Home.js';
import ChoosePassword from './components/anonymous/createAccount/ChoosePassword';
import InvitationPrefet from './components/anonymous/createAccount/InvitationPrefet';
import { useSelector } from 'react-redux';
import ForgottenPassword from './components/anonymous/ForgottenPassword';
import CandidateSondageForm from './components/anonymous/CandidateSondageForm';
import ConfirmationEmail from './components/anonymous/ConfirmationEmail';

import PrivateRoute from './components/connected/PrivateRoute';

require('dotenv').config();

function App() {

  const exports = useSelector(state => state.exports);

  return (
    <div className="App">
      { exports?.loading === true &&
      <div className="wrapperModal"></div>
      }
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/mot-de-passe-oublie" component={ForgottenPassword} />
          <Route path="/renouveler-mot-de-passe/:token" component={ForgottenPassword} />
          <Route path="/inscription/:token" component={ChoosePassword} />
          <Route path="/inscription-prefet/:token" component={InvitationPrefet} />
          <Route path="/dites-nous-en-plus-sur-vous/:token" component={CandidateSondageForm} />
          <Route path="/confirmer-email/:token" component={CandidateSondageForm} />
          <Route path="/confirmation-email/:token" component={ConfirmationEmail} />
          <PrivateRoute exact path="*" component={Home} />
        </Switch>
      </Router>
      <footer className="rf-footer rf-mt-12w" role="contentinfo" id="footer">
        <div className="rf-container">
          <div className="rf-grid-row">
            <div className="rf-col-1"></div>
            <div className="rf-col-10">
              <div className="rf-footer__body">
                <div className="rf-container" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                  <div className="rf-grid-row rf-grid-row--bottom">
                    <div>
                      <div>
                        <div className="rf-footer__brand">
                          <a className="rf-footer__brand-link">
                            <div style={{ display: 'inline-block' }} >
                              <img src="/logos/logoRF.svg" alt="logo République Française" style={{ height: '80px', marginRight: '28px' }}/>
                            </div>
                            <div style={{ display: 'inline-block' }} >
                              <img src="/logos/logo-anct.svg" alt="logo Agence Nationale De La Cohésion Des Territoires"
                                style={{ height: '59px', marginRight: '50px' }}/>
                            </div>
                            <div style={{ display: 'inline-block' }} >
                              <img src="/logos/logo-banque-des-territoires.svg" alt="logo Banque Des Territoires"
                                style={{ height: '35px', marginBottom: '27px', marginRight: '50px' }}/>
                            </div>
                            <div style={{ display: 'inline-block' }} >
                              <img src="/logos/logo-france-relance.svg" alt="logo France Relance" style={{ height: '70px', marginBottom: '7px' }}/>
                            </div>
                          </a>
                        </div>
                        <div className="rf-footer__content rf-mt-3w">
                          <p className="rf-footer__content-desc">
                        Conseiller numérique France Services est un dispositif financé par l&rsquo;&Eacute;tat dans le cadre de France Relance.
                        Il est piloté par l&rsquo;Agence nationale de la cohésion des territoires et opéré par la Banque des Territoires.
                          </p>
                        </div>
                        <div>
                          <ul className="rf-footer__content-list" style={{ justifyContent: 'flex-end' }}>
                            <li >
                              <a className="rf-footer__content-link" href="https://agence-cohesion-territoires.gouv.fr/">anct.gouv.fr</a>
                            </li>
                            <li >
                              <a className="rf-footer__content-link" href="https://societenumerique.gouv.fr/">societenumerique.gouv.fr</a>
                            </li>
                            <li >
                              <a className="rf-footer__content-link" href="https://www.banquedesterritoires.fr/">banquedesterritoires.fr</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="rf-footer__bottom">
                        <ul className="rf-footer__bottom-list">
                          <li className="rf-footer__bottom-item">
                            <a className="rf-footer__bottom-link rf-pr-1w" href="https://aide.conseiller-numerique.gouv.fr/fr/">FAQ</a>
                          </li>
                          <li className="rf-footer__bottom-item">
                            <a className="rf-footer__bottom-link rf-px-1w"
                              href="https://www.conseiller-numerique.gouv.fr/accessibilite">Accessibilité: non conforme
                            </a>
                          </li>
                          <li className="rf-footer__bottom-item">
                            <a className="rf-footer__bottom-link rf-px-1w"
                              href="https://www.conseiller-numerique.gouv.fr/mentions-legales">Mentions légales
                            </a>
                          </li>
                          <li className="rf-footer__bottom-item">
                            <a className="rf-footer__bottom-link rf-px-1w"
                              href="https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
                          Données personnelles
                            </a>
                          </li>
                          <li className="rf-footer__bottom-item">
                            <a className="rf-footer__bottom-link rf-px-1w"
                              href="https://cdn.conseiller-numerique.gouv.fr/CGU-Donn%C3%A9es_personnellesConseiller_Num%C3%A9rique.pdf">
                          Conditions générales d&rsquo;utilisation
                            </a>
                          </li>
                        </ul>
                        <div className="rf-footer__bottom-copy">
                          © République Française 2021
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rf-col-1"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
