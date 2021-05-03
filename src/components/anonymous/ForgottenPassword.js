import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Header from '../common/Header';
import { userActions } from '../../actions';

function ForgottenPassword({ match = null }) {

  const dispatch = useDispatch();
  const token = match.params.token;

  /* Etape 1*/
  const [inputs, setInputsEmail] = useState({
    username: ''
  });
  const [submitted, setSubmittedEmail] = useState(false);
  const { username } = inputs;

  function handleChangeEmail(e) {
    const { name, value } = e.target;
    setInputsEmail(inputs => ({ ...inputs, [name]: value }));
  }
  function handleSubmitEmail() {
    setSubmittedEmail(true);
    if (username) {
      dispatch(userActions.forgottenPassword(username));
    }
  }
  /* Etape 2 TODO */

  /* Etape 1 */
  return (
    <>
      <Header/>
      <div className="rf-container rf-mt-3w rf-mb-5w">
        <div className="rf-grid-row rf-grid-row--center rf-p-2w">
          {!token &&
          <>
            <div className="Login rf-col-6">
              <h2>Mot de passe oublié ?</h2>
              <p className="rf-my-3w">Nous allons vous envoyer un e-mail afin de vous permettre de modifier votre mot de passe.</p>
              <label className="rf-label">Adresse email</label>
              <input name="username" value={username} onChange={handleChangeEmail} className={(submitted && !username ? ' is-invalid rf-input' : 'rf-input')} />
              {submitted && !username &&
                <div className="invalid">Adresse email requise</div>
              }

              <button className="rf-btn rf-my-3w" onClick={handleSubmitEmail}>Poursuivre</button>
            </div>
          </>
          }
          {token &&
            <div className="Login rf-col-6 rf-p-5w">
              {/*<h2>Choisissez votre mot de passe<br /><span className="rf-fi-account-fill rf-fi--xl" /></h2>

              { verifyingToken &&
                <span>Chargement...</span>
              }

              { tokenVerified === false &&
                <span>Désolé mais le lien est invalide.</span>
              }

              { tokenVerified && !passwordChoosen &&
                <div>
                  <div>
                    {error && <span>{error.error ? error.error : 'Une erreur s\'est produite'}</span>}
                  </div>

                  <div className="rf-my-3w">
                    <label className="rf-label">Votre adresse email:</label>
                    <span>{user.name}</span>
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
                    { password && !checkComplexity(password) &&
                      <span>Le mot de passe doit contenir au moins 6 caractères.</span>
                    }
                  </div>

                  <div className="rf-my-3w">
                    <label className="rf-label">Mot de passe (confirmation)</label>
                    <input name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={handleChange}
                      className={(password !== confirmPassword ? ' is-invalid rf-input' : 'rf-input')} />
                    {password !== confirmPassword &&
                      <div className="invalid">Mot de passe doit être identique</div>
                    }
                  </div>

                  {choosingPassword && <span>Chargement...</span>}
                  <button className="rf-btn" onClick={handleSubmit}>Valider</button>
                </div>
              }

              { passwordChoosen &&
                <span>Votre compte a été créé avec succès. <Link to={`/login?role=${user?.role}`}>Vous pouvez vous connecter</Link>.</span>
              }

              <div className="rf-col-3"></div>
            */}
            </div>
          }
        </div>
      </div>
    </>
  );
  /* Etape 2 */

}

ForgottenPassword.propTypes = {
  match: PropTypes.object
};

export default ForgottenPassword;
