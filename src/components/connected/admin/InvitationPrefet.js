import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
    <div className="fr-container fr-mt-3w">
      <div className="fr-grid-row">
        <div className="Login fr-col-offset-3 fr-col-6">
          <h2>Invitez des utilisateurs dans l&apos;espace préfet<br /><span className="fr-fi-account-fill fr-fi--xl" /></h2>

          { verifyingToken &&
              <span>Chargement...</span>
          }
          { !accountsPrefetInvited &&
              <div>
                <div>
                  {error && <span style={{ color: 'red' }}>{error.error ? error.error : error ?? 'Une erreur s\'est produite'}</span>}
                </div>

                <div className="fr-my-3w">
                  <label className="fr-label">Adresse préfecture:</label>
                  <span>
                    <select className="fr-select" onChange={selectDepartement}>
                      {regions.map((region, idx) =>
                        <option key={idx} value={region.num_dep}>{region.num_dep} - {region.dep_name}</option>
                      )}
                    </select>
                  </span>
                </div>

                <div className="fr-my-3w">
                  <label className="fr-label">Adresse email à ajouter</label>
                  <ul>
                    {emails.map((email, idx) =>
                      <li key={idx}>
                        {email}
                        <button
                          className="fr-btn fr-fi-delete-line fr-btn--icon-left fr-btn--secondary fr-btn--sm fr-ml-1w"
                          onClick={handleRemoveEmail.bind(this, email)}>
                          Retirer
                        </button>
                      </li>)}
                  </ul>

                  <input name="email"
                    type="text"
                    value={email}
                    onChange={handleChange}
                    className="fr-input" />
                  { email && !checkEmail(email) &&
                    <span>L&apos;adresse email doit être du nom de domaine <strong>gouv.fr</strong>.</span>
                  }
                  { email && !checkEmailNotExist(email) &&
                    <span>L&apos;adresse email a déjà été ajoutée.</span>
                  }
                  <button className="fr-btn fr-mt-1w"
                    onClick={handleAddEmail}
                    disabled={ !email || !checkEmail(email) || !checkEmailNotExist(email)}>
                      Ajouter l&apos;utilisateur
                  </button>

                </div>

                {invitingAccountsPrefet && <span>Chargement...</span>}
                <button className="fr-btn fr-fi-checkbox-line fr-btn--icon-left" onClick={handleSubmit} disabled={emails.length === 0}>Valider</button>
              </div>
          }

          { accountsPrefetInvited &&
              <span style={{ color: 'green' }}>
                Invitation envoyée<br />
                Le nouvel utilisateur doit consulter ses mails pour activer son espace prefet.<br />
                <button className="fr-link" style={{ textDecoration: 'underline' }}
                  onClick={() => window.location.reload() }>Je souhaite inviter une nouvelle personne</button>
              </span>
          }
          <div className="fr-col-3"></div>
        </div>
      </div>
    </div>
  );
}

export default InvitationPrefet;
