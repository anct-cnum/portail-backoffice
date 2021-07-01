import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../actions';
import FlashMessage from 'react-flash-message';

function MonCompte() {
  const dispatch = useDispatch();
  const { _id } = useSelector(state => state.authentication.user?.user);
  const userId = useSelector(state => state.user?.userId);
  const [form, setForm] = useState(false);
  const error = useSelector(state => state?.user?.patchError);
  const flashMessage = useSelector(state => state?.user?.flashMessage);
  // const userconnect = useSelector(state => state.user?.userId);
  const [email, setEmail] = useState(userId?.name);
  useEffect(() => {
    dispatch(userActions.getUser(_id));
    setEmail(userId?.name);
  }, []);

  const handleForm = event => {
    setEmail(event.target.value);
  };
  const updateEmail = () => {
    dispatch(userActions.updateUserEmail({ id: _id, newEmail: email }));
    setTimeout(() => {
      setForm(false);
      dispatch(userActions.getUser(_id));
    }, 0);
    dispatch(userActions.getUser(_id));
  };

  return (
    <div>
      {flashMessage === true ?
        <div className="">
          <div style={{ width: '50%' }}>
            <div>
              <FlashMessage duration={10000}>
                { (error === undefined || error === false) &&
                <p className="rf-label flashBag" style={{ fontSize: '16px' }}>
                  Nous vous avons envoyer un mail à : <strong style={{ color: 'black' }}>{email}</strong> afin que vous le confirmer
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
          <p>Email :<strong> { userId?.name }</strong></p>
          <button className={userId?.role === 'admin' ? 'rf-btn rfmt-2w rf-mt-5w' : 'rf-btn'} onClick={() => setForm(true)}>
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
