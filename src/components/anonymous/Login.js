import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const urlTableauDePilotage = process.env.REACT_APP_TABLEAU_DE_PILOTAGE_HOSTNAME;
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
      <Header />
      {role === 'structure' || role === 'prefet' && error && loggingIn === false &&
        <dialog aria-labelledby="fr-modal-confirm-siret" role="dialog" id="fr-modal-confirm-siret" className="fr-modal modalOpened">
          <div className="fr-container fr-container--fluid fr-container-md">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
                <div className="fr-modal__body">
                  <div className="fr-modal__header"></div>
                  <div className="fr-modal__content">
                    <h1 id="fr-modal-title-modal-1" className="fr-modal__title">
                      A partir de maintenant l&rsquo;espace Coop {role} &eacute;volue et devient &quot;Le tableau de pilotage&quot;
                    </h1>
                    <div>
                      <strong>Pourquoi un changement de nom et d&rsquo;interface ?</strong><br />
                      <span>Votre espace &eacute;volue pour mieux r&eacute;pondre &agrave; vos attentes !</span>
                      <p className="fr-mb-2w fr-mt-2w">
                        Le tableau de pilotage vous propose une identit&eacute; visuelle personnalis&eacute;e ainsi qu&rsquo;un nouvel
                        univers int&eacute;grant de nouvelles fonctionnalit&eacute;s et donn&eacute;es.
                      </p>
                      <p className="fr-mb-2w">
                        <strong>Ce qui ne change pas</strong><br />
                        <span>Notre philosophie centr&eacute;e utilisateur</span>
                      </p>
                      <p>
                        <strong>Comment acc&eacute;der au Tableau de pilotage ?</strong><br />
                        <span>En cliquant sur le <a href={`${urlTableauDePilotage}/login`}>lien</a></span>
                      </p>
                      <span className="fr-mt-4w">L&rsquo;&eacute;quipe Conseiller num&eacute;rique</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      }
      <div className="fr-container fr-mt-3w fr-mb-5w">
        <div className="fr-grid-row fr-grid-row--center fr-p-2w">
          <div className="fr-col-12 centrer fr-my-3w">
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
          </div>

          { role === 'structure' &&
            <div className="fr-col-12 fr-col-sm-6 fr-pt-10w">
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
            </div>
          }

          <div
            className={`Login ${role === 'structure' ? 'fr-col-12 fr-col-sm-6 fr-p-2w' : 'fr-col-6'}`}
            style={role === 'structure' ? { textAlign: 'left' } : { textAlign: 'center' }} >
            <h2>Connexion</h2>
            <div>
              <div>
                {error && <span style={{ color: 'red' }}>{error.error ? error.error : 'Une erreur s\'est produite'}</span>}
              </div>

              <div className="fr-my-3w">
                <label className="fr-label">Adresse email</label>
                <input name="username" value={username} onChange={handleChange} className={(submitted && !username ? ' is-invalid fr-input' : 'fr-input')} />
                {submitted && !username &&
              <div className="invalid">Adresse email requise</div>
                }
              </div>

              <div className="fr-my-3w">
                <label className="fr-label">Mot de passe</label>
                <input name="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  className={(submitted && !password ? ' is-invalid fr-input' : 'fr-input')} />
                {submitted && !password &&
              <div className="invalid">Mot de passe requis</div>
                }
              </div>
              {loggingIn && <span>Connexion en cours...</span>}
              <button className="fr-btn" onClick={handleSubmit}>Se connecter</button>
              <p className="fr-mt-3w">
                <Link to={`/mot-de-passe-oublie`}>Mot de passe oublié ?</Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
