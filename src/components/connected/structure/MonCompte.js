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
                <p className="rf-label flashBag" style={{ fontSize: '16px' }}>
                  Nous vous avons envoyé un mail à : <strong style={{ color: 'black' }}>{email}</strong> pour confirmation
                  &nbsp;
                  <i className="ri-check-line ri-xl" style={{ verticalAlign: 'middle' }}></i>
                </p>
                }
                { (error !== undefined && error !== false) &&
                <p className="rf-label flashBag labelError" style={{ fontSize: '16px' }}>
                  Cet adresse e-mail est déjà utilisée
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
          <button className={role === 'admin' ? 'rf-btn rfmt-2w rf-mt-5w' : 'rf-btn'} onClick={() => setForm(true)}>
              Modifier mon adresse e-mail &ensp;
            <span style={{ color: 'white' }} className="rf-fi-edit-line" aria-hidden="true"/>
          </button>
        </> :
        <div className="rf-container--fluid">
          <div className="rf-my-3w rf-col-lg-3 rf-col-3 rf-col-sm-8">
            <label className="rf-label">E-mail</label>
            <input className="rf-input" type="text" id="text-input-text" name="name" value={email} onChange={handleForm}/>
          </div>
          <div className="rf-col-lg-3 rf-col-3 rf-col-sm-8">
            <button onClick={() => setForm(false)} className="rf-btn">Annuler </button>
            <button className="rf-btn rf-m-auto" style={{ float: 'right' }} onClick={updateEmail}>Valider</button>
          </div>
        </div>
      }
    </div>
  );
}

export default MonCompte;
