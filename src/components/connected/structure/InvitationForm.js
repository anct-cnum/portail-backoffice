import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../actions';

function InvitationForm({ displayForm, structureId, setMessageInvitationReussie }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [activeMessage, setActiveMessage] = useState(false);

  const handleForm = event => {
    const { name, value } = event.target;
    setEmail({
      ...email,
      [name]: value
    });
  };
  const valideEmail = new RegExp(/^[a-zA-Z0-9-._]+@[a-zA-Z0-9-._]{2,}[.][a-zA-Z]{2,3}$/);
  const sendInvitation = () => {
    if (valideEmail.test(email.email) && structureId) {
      displayForm(false);
      dispatch(userActions.inviteStructure(email.email, structureId));
      dispatch(userActions.usersByStructure(structureId));
      setMessageInvitationReussie(true);
    } else {
      setActiveMessage(true);
    }
  };
  return (
    <div>
      <div className="rf-my-3w">
        <label className="rf-label">Email</label>
        <input className="rf-input" type="email" id="text-input-text" name="email" onChange={handleForm} />
        { email && !valideEmail.test(email.email) && activeMessage &&
                    <div className="invalid">Le format de l&rsquo;email saisi est invalide.</div>
        }
      </div>
      <button onClick={() => displayForm(false) } className="rf-btn">Annuler</button>
      <button style={{ float: 'right' }} className="rf-btn" onClick={sendInvitation} disabled={!email?.email ? 'disabled' : ''}>Envoyer</button>
    </div>
  );
}

InvitationForm.propTypes = {
  displayForm: PropTypes.func,
  structureId: PropTypes.string,
  setMessageInvitationReussie: PropTypes.func
};
export default InvitationForm;

