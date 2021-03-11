import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../actions';
import Header from '../common/Header';

function Login() {

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;
  const loggingIn = useSelector(state => state.authentication.loggingIn);
  const error = useSelector(state => state.authentication.error);
  const dispatch = useDispatch();
  const location = useLocation();

  const role = new URLSearchParams(location.search).get('role');

  useEffect(() => {
    dispatch(userActions.logout());
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

  function handleSubmit() {
    setSubmitted(true);
    if (username && password) {
      const { from } = location.state || { from: { pathname: '/' } };
      dispatch(userActions.login(username, password, from));
    }
  }

  return (
    <div>
      <Header/>
      <div className="rf-container rf-mt-3w rf-mb-5w">
        <div className="rf-grid-row rf-grid-row--center rf-p-2w">
          <span style={{ textAlign: 'center' }}>
            { role === 'structure' &&
              <strong>Cet espace dédié aux structures permet la consultation de candidatures et la sélection de candidats.
                <br/>Il met à disposition également de la documentation et l&rsquo;affichage de ses informations.
              </strong>
            }
            { role === 'prefet' &&
              <strong>
                Cet espace vous permet de visualiser l&apos;ensemble des structures qui ont manifesté leur intérêt pour le
                dispositif Conseiller Numérique France Services sur votre département
              </strong>
            }
          </span>
        </div>
        <div className="rf-grid-row">

          { role === 'structure' &&
          <div className="rf-col-xs-12 rf-col-sm-6 rf-pt-8w">
            <p>
              <strong>Rappel sur les étapes du processus de recrutement
              des conseillers numériques France Services</strong>
            </p>
            <div>
              <ul style={{ paddingLeft: '18px' }}>
                <li>Inscription sur la plateforme <a href="http://conseiller-numerique.gouv.fr/">conseiller-numerique.gouv.fr</a></li>
                <li>Concertation territoriale</li>
                <li>&Eacute;tude des candidatures <span style={{ color: '#B60000' }}>(Vous êtes ici)</span></li>
                <li>Conduite des entretiens de recrutement</li>
                <li>Demande de subvention</li>
                <li>Signature du contrat</li>
              </ul>
            </div>
          </div> }
          <div className="Login rf-col-xs-12 rf-col-sm-6 rf-p-2w" style={{ textAlign: 'left' }}>
            <h2>Connexion</h2>
            <div>
              <div>
                {error && <span style={{ color: 'red' }}>{error.error ? error.error : 'Une erreur s\'est produite'}</span>}
              </div>

              <div className="rf-my-3w">
                <label className="rf-label">Adresse email</label>
                <input name="username" value={username} onChange={handleChange} className={(submitted && !username ? ' is-invalid rf-input' : 'rf-input')} />
                {submitted && !username &&
              <div className="invalid">Adresse email requise</div>
                }
              </div>

              <div className="rf-my-3w">
                <label className="rf-label">Mot de passe</label>
                <input name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  className={(submitted && !password ? ' is-invalid rf-input' : 'rf-input')} />
                {submitted && !password &&
              <div className="invalid">Mot de passe requis</div>
                }
              </div>
              {loggingIn && <span>Connexion en cours...</span>}
              <button className="rf-btn" onClick={handleSubmit}>Se connecter</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
