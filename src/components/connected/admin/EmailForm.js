import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { structureActions } from '../../../actions';

function EmailForm({ setDisplayFormEmail, structureId, setMessageEmailChange }) {
  const dispatch = useDispatch();
  const [messageValidEmailRegex, setMessageValidEmailRegex] = useState(false);
  const [email, setEmail] = useState({
    email: ''
  });
  const valideEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const handleForm = e => {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value.replace(/\s/g, '')
    });
  };
  const ChangeEmail = () => {
    setMessageValidEmailRegex(true);
    if (valideEmail.test(email.email) && structureId) {
      dispatch(structureActions.updateStructureEmail(email.email.toLocaleLowerCase(), structureId));
      setDisplayFormEmail(false);
      setMessageValidEmailRegex(false);
      setTimeout(() => {
        dispatch(structureActions.get(structureId));
        setMessageEmailChange(true);
      }, 300);
    }
  };

  return (
    <div style={{ width: '320px' }}>
      <div className="rf-my-3w">
        <label className="rf-label"><h3>Email</h3></label>
        <input className="rf-input" type="text" id="text-input-text" name="email" onChange={handleForm} />
        { messageValidEmailRegex && !valideEmail.test(email.email) &&
                    <p className="invalid">Le format de l&rsquo;email saisi est invalide.</p>
        }
      </div>
      <button onClick={() => setDisplayFormEmail(false)} className="rf-btn rf-btn--secondary">Annuler</button>
      <button style={{ float: 'right' }} className="rf-btn" onClick={ChangeEmail}>Valider</button>
    </div>
  );
}
EmailForm.propTypes = {
  setDisplayFormEmail: PropTypes.func,
  setMessageEmailChange: PropTypes.func,
  structureId: PropTypes.string,
};
export default EmailForm;
