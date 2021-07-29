import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../actions';

function InvitationForm({ displayForm, structureId }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();

  useEffect(() => {
  }, []);

  const handleForm = event => {
    const { name, value } = event.target;
    setEmail({
      ...email,
      [name]: value
    });
  };
  const sendInvitation = () => {
    if (email.email !== '' && structureId) {
      displayForm(false);
      dispatch(userActions.inviteStructure(email.email, structureId));
      dispatch(userActions.usersByStructure(structureId));
    }
  };
  return (
    <div>
      <div className="rf-my-3w">
        <label className="rf-label">Email</label>
        <input className="rf-input" type="email" id="text-input-text" name="email" onChange={handleForm} />
      </div>
      <button onClick={() => displayForm(false)} className="rf-btn">Annuler</button>
      <button style={{ float: 'right' }} className="rf-btn" onClick={sendInvitation} disabled={!email?.email ? 'disabled' : ''}>Envoyer</button>
    </div>
  );
}

InvitationForm.propTypes = {
  displayForm: PropTypes.func,
  structureId: PropTypes.string,
};
export default InvitationForm;

