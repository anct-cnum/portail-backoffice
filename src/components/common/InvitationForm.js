import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { userActions } from '../../actions';

function InvitationForm({ setDisplayFormMulticompte, structureId, setLoadingSnipper }) {
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
      setLoadingSnipper(true);
      setDisplayFormMulticompte(false);
      dispatch(userActions.inviteStructure(email.email, structureId));
      dispatch(userActions.usersByStructure(structureId));
      window.scrollTo(0, 0);
    } else {
      setActiveMessage(true);
    }
  };
  return (
    <div>
      <div className="fr-my-3w">
        <label className="fr-label">Email</label>
        <input className="fr-input" type="email" id="text-input-text" name="email" onChange={handleForm} />
        { email && !valideEmail.test(email.email) && activeMessage &&
          <div className="invalid">Le format de l&rsquo;email saisi est invalide.</div>
        }
      </div>
      <button onClick={() => setDisplayFormMulticompte(false) } className="fr-btn">Annuler</button>
      <button style={{ float: 'right' }} className="fr-btn" onClick={sendInvitation} disabled={!email?.email ? 'disabled' : ''}>Envoyer</button>
    </div>
  );
}

InvitationForm.propTypes = {
  setDisplayFormMulticompte: PropTypes.func,
  setLoadingSnipper: PropTypes.func,
  structureId: PropTypes.string,
};

export default InvitationForm;

