import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { userActions } from '../../../actions';

import regions from '../../anonymous/createAccount/departements-region.json';

function InvitationPrefet() {

  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState('');
  const [departement, setDepartement] = useState(regions[0].num_dep);

  const verifyingToken = useSelector(state => state.createAccount.verifyingPrefetToken);
  const invitingAccountsPrefet = useSelector(state => state.createAccount.invitingAccountsPrefet);
  const accountsPrefetInvited = useSelector(state => state.createAccount.accountsPrefetInvited);
  const error = useSelector(state => state.createAccount.error);
  const dispatch = useDispatch();

  const checkEmail = email => email.endsWith('.gouv.fr');

  const checkEmailNotExist = email => !emails.includes(email);

  function handleSubmit() {
    dispatch(userActions.inviteAccountsPrefet(emails, departement));
  }

  function handleChange(e) {
    const { value } = e.target;
    setEmail(value);
  }

  function handleAddEmail() {
    setEmails([...emails, email]);
    setEmail('');
  }

  function handleRemoveEmail(email) {
    setEmails(emails.filter(item => item !== email));
  }

  function selectDepartement(event) {
    setDepartement(event.target.value);
  }

  return (
    <div className="rf-container rf-mt-3w">
      <div className="rf-grid-row">
        {/* <div className="rf-col-3"></div> */}
        <div className="Login rf-col-6">
          <h2>Invitez des utilisateurs dans votre espace préfet<br /><span className="rf-fi-account-fill rf-fi--xl" /></h2>

          { verifyingToken &&
              <span>Chargement...</span>
          }

          { !accountsPrefetInvited &&
              <div>
                <div>
                  {error && <span>{error.error ? error.error : 'Une erreur s\'est produite'}</span>}
                </div>

                <div className="rf-my-3w">
                  <label className="rf-label">Votre adresse préfecture:</label>
                  <span>
                    <select className="rf-select" onChange={selectDepartement}>
                      {regions.map((region, idx) =>
                        <option key={idx} value={region.num_dep}>{region.num_dep} - {region.dep_name}</option>
                      )}
                    </select>
                  </span>
                </div>

                <div className="rf-my-3w">
                  <label className="rf-label">Adresse email à ajouter</label>
                  <ul>
                    {emails.map((email, idx) =>
                      <li key={idx}>
                        {email}
                        <button
                          className="rf-btn rf-fi-delete-line rf-btn--icon-left rf-btn--secondary rf-btn--sm rf-ml-1w"
                          onClick={handleRemoveEmail.bind(this, email)}>
                          Retirer
                        </button>
                      </li>)}
                  </ul>

                  <input name="email"
                    type="text"
                    value={email}
                    onChange={handleChange}
                    className="rf-input" />
                  { email && !checkEmail(email) &&
                    <span>L&apos;adresse email doit être du nom de domaine <strong>gouv.fr</strong>.</span>
                  }
                  { email && !checkEmailNotExist(email) &&
                    <span>L&apos;adresse email a déjà été ajoutée.</span>
                  }
                  <button className="rf-btn rf-mt-1w"
                    onClick={handleAddEmail}
                    disabled={ !email || !checkEmail(email) || !checkEmailNotExist(email)}>
                      Ajouter l&apos;utilisateur
                  </button>

                </div>

                {invitingAccountsPrefet && <span>Chargement...</span>}
                <button className="rf-btn rf-fi-checkbox-line rf-btn--icon-left" onClick={handleSubmit} disabled={emails.length === 0}>Valider</button>
              </div>
          }

          { accountsPrefetInvited &&
              <span>Les utilisateurs de votre espace préfet ont été invités.</span>
          }

          <div className="rf-col-3"></div>
        </div>
      </div>
    </div>
  );
}

InvitationPrefet.propTypes = {
  match: PropTypes.object
};

export default InvitationPrefet;
