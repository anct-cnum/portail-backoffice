import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { structureActions } from '../../../actions';

function EmailForm({ setDisplayFormEmail, structureId }) {
  const dispatch = useDispatch();
  const [messageValidEmailRegex, setMessageValidEmailRegex] = useState(false);
  const [email, setEmail] = useState('');
  const valideEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const handleForm = e => {
    const { value } = e.target;
    setEmail(value.replace(/\s/g, ''));
  };
  const ChangeEmail = () => {
    setMessageValidEmailRegex(true);
    if (valideEmail.test(email) && structureId) {
      dispatch(structureActions.updateStructureEmail(email.toLocaleLowerCase(), structureId));
      setDisplayFormEmail(false);
      setMessageValidEmailRegex(false);
    }
  };

  return (
    <div style={{ width: '320px' }}>
      <div className="fr-my-3w">
        <label className="fr-label"><h3>Email</h3></label>
        <input className="fr-input" type="text" id="text-input-text" name="email" onChange={handleForm} />
        { messageValidEmailRegex && !valideEmail.test(email) &&
                    <p className="invalid">Le format de l&rsquo;email saisi est invalide.</p>
        }
      </div>
      <button onClick={() => setDisplayFormEmail(false)} className="fr-btn fr-btn--secondary">Annuler</button>
      <button style={{ float: 'right' }} className="fr-btn" onClick={ChangeEmail}>Valider</button>
    </div>
  );
}
EmailForm.propTypes = {
  setDisplayFormEmail: PropTypes.func,
  structureId: PropTypes.string,
};
export default EmailForm;
