import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../common/Header';
import { userActions } from '../../actions';
import { Link } from 'react-router-dom';

function ForgottenPassword({ match = null }) {

  const dispatch = useDispatch();
  const token = match.params.token;

  /* Etape 1*/
  const [inputEmail, setInputsEmail] = useState({
    username: ''
  });
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const { username } = inputEmail;
  function handleChangeEmail(e) {
    const { name, value } = e.target;
    setInputsEmail(inputEmail => ({ ...inputEmail, [name]: value }));
  }
  function handleSubmitEmail() {
    setSubmittedEmail(true);
    if (username) {
      dispatch(userActions.forgottenPassword(username));
    }
  }
  const errorEmail = useSelector(state => state.motDePasseOublie.error);
  const validEmail = useSelector(state => state.motDePasseOublie.user);

  /* Etape 2 TODO */
  const [inputsPassword, setInputsPassword] = useState({
    password: '',
    confirmPassword: ''
  });

  const [submittedPassword, setSubmittedPassword] = useState(false);
  const { password, confirmPassword } = inputsPassword;

  const user = useSelector(state => state.createAccount.user);
  const verifyingToken = useSelector(state => state.createAccount.verifyingToken);
  const tokenVerified = useSelector(state => state.createAccount.tokenVerified);

  const choosingPassword = useSelector(state => state.createAccount.choosingPassword);
  const passwordChoosen = useSelector(state => state.createAccount.passwordChoosen);
  const errorPassword = useSelector(state => state.createAccount.error);

  useEffect(() => {
    dispatch(userActions.verifyToken(token));
  }, []);

  function handleChangePassword(e) {
    const { name, value } = e.target;
    setInputsPassword(inputsPassword => ({ ...inputsPassword, [name]: value }));
  }

  const checkComplexity = password => password.length >= 6;

  function handleSubmitPassword() {
    setSubmittedPassword(true);
    if (password && confirmPassword === password && checkComplexity(password)) {
      dispatch(userActions.choosePassword(token, password, 'renouvellement'));
    }
  }

  return (
    <>
      <Header/>
      <div className="rf-container rf-mt-3w rf-mb-5w">
        <div className="rf-grid-row rf-grid-row--center rf-p-2w">

          {!token &&
          /* Etape 1 */
          <>
            <div className="Login rf-col-6">
              <h2>Mot de passe oublié ?</h2>
              <p className="rf-my-3w">Nous allons vous envoyer un e-mail afin de vous permettre de modifier votre mot de passe.</p>
              {submittedEmail && validEmail &&
               <div className="valid rf-mb-3w">L&#39;e-mail de renouvellement de mot de passe a pu être envoyé sur : {username} !</div>
              }
              {submittedEmail && errorEmail === 'User not found' &&
                <div className="invalid rf-mb-3w">
                  L&#39;e-mail de renouvellement de mot de passe n&#39;a pas pu être envoyé, vérifiez votre adresse e-mail !
                </div>
              }
              {submittedEmail && !username &&
                <div className="invalid rf-mb-3w">Adresse email requise</div>
              }

              <label className="rf-label">Adresse email</label>
              <input name="username" value={username} onChange={handleChangeEmail}
                className={(submittedEmail && !username ? ' is-invalid rf-input' : 'rf-input')}
              />

              <button className="rf-btn rf-my-3w" onClick={handleSubmitEmail}>Poursuivre</button>
            </div>
          </>
          }
          {token &&
            /* Etape 2 */
            <div className="Login rf-col-8 rf-p-5w">
              <h2>Renouveler votre mot de passe<br /><span className="rf-fi-account-fill rf-fi--xl" /></h2>

              { verifyingToken &&
                <span>Chargement...</span>
              }

              { tokenVerified === false &&
                <span>Désolé mais le lien est invalide.</span>
              }

              { tokenVerified && !passwordChoosen &&
                <div>
                  <div>
                    {errorPassword && <span>{errorPassword.error ? errorPassword.error : 'Une erreur s\'est produite'}</span>}
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
                      onChange={handleChangePassword}
                      className={(submittedPassword && !password ? ' is-invalid rf-input' : 'rf-input')} />
                    {submittedPassword && !password &&
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
                      onChange={handleChangePassword}
                      className={(password !== confirmPassword ? ' is-invalid rf-input' : 'rf-input')} />
                    {password !== confirmPassword &&
                      <div className="invalid">Mot de passe doit être identique</div>
                    }
                  </div>

                  {choosingPassword && <span>Chargement...</span>}
                  <button className="rf-btn" onClick={handleSubmitPassword}>Valider</button>
                </div>
              }
              { passwordChoosen &&
                <span>Votre compte a été créé avec succès. <Link to={`/login?role=${user?.role}`}>Vous pouvez vous connecter</Link>.</span>
              }

              <div className="rf-col-3"></div>
            </div>
          }
        </div>
      </div>
    </>
  );


}

ForgottenPassword.propTypes = {
  match: PropTypes.object
};

export default ForgottenPassword;
