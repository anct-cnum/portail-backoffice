import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../actions';
import FlashMessage from 'react-flash-message';

function MonCompte() {
  const dispatch = useDispatch();
  const { _id, name, role } = useSelector(state => state.authentication.user?.user);
  const [form, setForm] = useState(false);
  const error = useSelector(state => state?.user?.patchError);
  const user = useSelector(state => state?.user);
  const [email, setEmail] = useState(name);
  const [flashMessage, setFlashMessage] = useState(false);

  const handleForm = event => {
    setEmail(event.target.value);
  };
  const updateEmail = () => {
    dispatch(userActions.updateUserEmail({ id: _id, newEmail: email }));
    setForm(false);
    setFlashMessage(true);
    setTimeout(() => {
      setFlashMessage(false);
    }, 10000);
  };

  return (
    <div>
      {flashMessage === true && user.flashMessage === true ?
        <div className="">
          <div style={{ width: '50%' }}>
            <div>
              <FlashMessage duration={10000}>
                { (error === undefined || error === false) &&
                <p className="fr-label flashBag" style={{ fontSize: '16px' }}>
                  Nous vous avons envoyé un mail à : <strong style={{ color: 'black' }}>{email}</strong> pour confirmation
                  &nbsp;
                  <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                </p>
                }
                { (error !== undefined && error !== false) &&
                <p className="fr-label flashBag labelError" style={{ fontSize: '16px' }}>
                  {error}
                </p>
                }
              </FlashMessage>
            </div>
          </div>
        </div> : ''
      }
      <h2 style={{ marginTop: '0' }}>Mon compte</h2>
      {form === false ?
        <>
          <p>Email :<strong> { name }</strong></p>
          <button className={role === 'admin' ? 'fr-btn rfmt-2w fr-mt-5w' : 'fr-btn'} onClick={() => setForm(true)}>
              Modifier mon adresse e-mail &ensp;
            <span style={{ color: 'white' }} className="fr-fi-edit-line" aria-hidden="true"/>
          </button>
        </> :
        <div className="fr-container--fluid">
          <div className="fr-my-3w fr-col-lg-3 fr-col-3 fr-col-sm-8">
            <label className="fr-label">E-mail</label>
            <input className="fr-input" type="text" id="text-input-text" name="name" value={email} onChange={handleForm}/>
          </div>
          <div className="fr-col-lg-3 fr-col-3 fr-col-sm-8">
            <button onClick={() => setForm(false)} className="fr-btn">Annuler </button>
            <button className="fr-btn fr-m-auto" style={{ float: 'right' }} onClick={updateEmail}>Valider</button>
          </div>
        </div>
      }
    </div>
  );
}

export default MonCompte;
